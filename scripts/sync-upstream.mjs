#!/usr/bin/env node
/**
 * Vendor the guide, and check that what is vendored still matches the code.
 *
 *   npm run sync            fetch and write
 *   npm run sync:check      fail if what is here differs from upstream (CI)
 *   npm run sync -- --ref <sha|branch>   move the pin
 *
 * WHY THIS EXISTS
 *
 * The guide lives in `docs/guide/` in mrlynn/lancescope, next to the code it
 * describes, and six of its pages are generated from that code by
 * `scripts/gen_docs.py` — the upstream `make test` fails if they drift. Copying
 * those files here by hand would put a stale rendering of a generated file on a
 * public website, which is the exact failure the generator was written to prevent.
 *
 * It also checks `app/globals.css`. That file already carries a comment admitting
 * it is a copy and that NOTHING CHECKS IT. Now something does: every custom
 * property this site declares is compared against upstream's value for the same
 * property, so two different corals on the site and in the console fails CI
 * instead of being noticed in a screenshot months later.
 *
 * The pin is a commit, not a branch, so a deploy of this site renders a guide
 * somebody chose rather than whatever main happened to say that morning.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PIN = path.join(ROOT, "content", ".upstream.json");
const GUIDE_OUT = path.join(ROOT, "content", "guide");
const CSS_LOCAL = path.join(ROOT, "app", "globals.css");

const UPSTREAM_GUIDE = "docs/guide";
const UPSTREAM_CSS = "web/app/globals.css";

const args = process.argv.slice(2);
const check = args.includes("--check");
const refArg = args.includes("--ref") ? args[args.indexOf("--ref") + 1] : null;

const pin = JSON.parse(fs.readFileSync(PIN, "utf8"));
const repo = pin.repo;
const ref = refArg ?? pin.ref;

/** Fetch the repository at `ref` and return the extracted directory. */
function fetchTree() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lancescope-upstream-"));
  const url = `https://codeload.github.com/${repo}/tar.gz/${ref}`;
  // curl and tar rather than a dependency: this runs in CI and on a laptop, and
  // adding a tarball client to a marketing site's package.json to read 24 markdown
  // files would be the wrong trade.
  try {
    // `pipefail` is load-bearing: without it the pipeline exits with tar's status,
    // and tar is perfectly happy to extract nothing from an empty stream. A 404
    // from curl then looked like a successful sync of zero files.
    execFileSync("bash", ["-o", "pipefail", "-c",
                          `curl -fsSL "${url}" | tar -xz -C "${dir}"`], {
      stdio: ["ignore", "ignore", "ignore"],
    });
  } catch {
    // The commonest cause by far is a ref that is not in that repository — a sha
    // from the wrong checkout, or one that was never pushed. Saying so beats the
    // ERR_INVALID_ARG_TYPE that an empty extract directory produces two lines
    // further down, which names nothing that would help.
    throw new Error(
      `could not fetch ${repo}@${ref}\n` +
      `  Is that commit pushed to ${repo}? The pin is a commit in the *upstream* ` +
      `repository,\n  not in this one.`,
    );
  }
  const [inner] = fs.readdirSync(dir);
  if (!inner) throw new Error(`${repo}@${ref} extracted to nothing`);
  return path.join(dir, inner);
}

/* -------------------------------------------------------------------- guide */

function guideFrom(tree) {
  const src = path.join(tree, UPSTREAM_GUIDE);
  if (!fs.existsSync(src)) {
    throw new Error(`${UPSTREAM_GUIDE} is not in ${repo}@${ref}`);
  }
  const files = fs.readdirSync(src).filter((f) => f.endsWith(".md")).sort();
  if (files.length === 0) throw new Error(`no markdown in ${UPSTREAM_GUIDE}`);
  return new Map(files.map((f) => [f, fs.readFileSync(path.join(src, f), "utf8")]));
}

function localGuide() {
  if (!fs.existsSync(GUIDE_OUT)) return new Map();
  return new Map(
    fs.readdirSync(GUIDE_OUT).filter((f) => f.endsWith(".md")).sort()
      .map((f) => [f, fs.readFileSync(path.join(GUIDE_OUT, f), "utf8")]),
  );
}

function diffGuide(want, have) {
  const problems = [];
  for (const [name, text] of want) {
    if (!have.has(name)) problems.push(`missing: ${name}`);
    else if (have.get(name) !== text) problems.push(`stale:   ${name}`);
  }
  for (const name of have.keys()) {
    if (!want.has(name)) problems.push(`removed upstream: ${name}`);
  }
  return problems;
}

/* ---------------------------------------------------------------------- css */

/** The dark palette a file declares, wherever it declares it.
 *
 *  This used to take the first declaration of each name and say so: "both files
 *  declare the dark palette first and override it under the same two light
 *  selectors". That was true when it was written and is not any more. The console
 *  moved to light-first, with dark under `:root[data-theme="dark"]`; this site is
 *  still dark-first, because dark is its identity and the comment at the top of
 *  app/globals.css says so.
 *
 *  Comparing first-declaration to first-declaration then compared this site's dark
 *  against the console's light and reported all fifteen shared tokens as drift —
 *  a check that fails on every token cannot tell you which one someone changed.
 *
 *  So: read the dark block by name where a file has one, and fall back to the
 *  first `:root` where dark *is* the first block. Both halves stay comparable
 *  whichever way round either file decides to declare itself. */
function darkBlock(css) {
  // The first `[data-theme="dark"]` block that actually declares colours. Both
  // files also carry a one-line `:root[data-theme="dark"] { color-scheme: dark; }`,
  // and matching that one yields a palette of nothing — which compares equal to
  // everything and turns this check into decoration. Requiring a custom property
  // is what tells the two apart.
  for (const m of css.matchAll(/:root\[data-theme="dark"\]\s*{([^}]*)}/g)) {
    if (/--[a-z0-9-]+\s*:/i.test(m[1])) return m[1];
  }
  const first = css.match(/:root\s*{([^}]*)}/);
  return first ? first[1] : css;
}

function tokens(css) {
  const found = new Map();
  for (const m of darkBlock(css).matchAll(/(--[a-z0-9-]+)\s*:\s*([^;}]+)/gi)) {
    const name = m[1];
    const value = m[2].trim().replace(/\s+/g, " ");
    if (!found.has(name)) found.set(name, value);
  }
  return found;
}

function diffCss(upstreamCss, localCss) {
  const want = tokens(upstreamCss);
  const have = tokens(localCss);
  const problems = [];
  for (const [name, value] of have) {
    // Only tokens upstream also defines. The site is allowed its own.
    if (!want.has(name)) continue;
    if (want.get(name) !== value) {
      problems.push(`token ${name}: site has ${value}, console has ${want.get(name)}`);
    }
  }
  return problems;
}

/* --------------------------------------------------------------------- main */

const tree = fetchTree();
const want = guideFrom(tree);
const upstreamCss = fs.readFileSync(path.join(tree, UPSTREAM_CSS), "utf8");

if (check) {
  const problems = [
    ...diffGuide(want, localGuide()),
    ...diffCss(upstreamCss, fs.readFileSync(CSS_LOCAL, "utf8")),
  ];
  if (problems.length) {
    console.error(`\nvendored copies differ from ${repo}@${ref.slice(0, 7)}:\n`);
    for (const p of problems) console.error(`  ${p}`);
    console.error(`\nRun \`npm run sync\` to take the guide, and reconcile any token`);
    console.error(`differences by hand — the console's value is the original.\n`);
    process.exit(1);
  }
  console.log(`  ${want.size} guide pages and the palette match ${repo}@${ref.slice(0, 7)}`);
  process.exit(0);
}

fs.rmSync(GUIDE_OUT, { recursive: true, force: true });
fs.mkdirSync(GUIDE_OUT, { recursive: true });
for (const [name, text] of want) {
  fs.writeFileSync(path.join(GUIDE_OUT, name), text);
}
if (refArg) {
  fs.writeFileSync(PIN, `${JSON.stringify({ ...pin, ref: refArg }, null, 2)}\n`);
}
console.log(`  ${want.size} guide pages from ${repo}@${ref.slice(0, 7)} -> content/guide`);

const cssProblems = diffCss(upstreamCss, fs.readFileSync(CSS_LOCAL, "utf8"));
if (cssProblems.length) {
  console.log(`\n  the palette has drifted — not written automatically, because`);
  console.log(`  app/globals.css is this site's file and only its tokens are shared:\n`);
  for (const p of cssProblems) console.log(`    ${p}`);
} else {
  console.log(`  palette matches (${tokens(upstreamCss).size} tokens compared)`);
}
