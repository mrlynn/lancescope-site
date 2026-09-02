# lancescope.mlynn.dev

The marketing site for [LanceScope](https://github.com/mrlynn/lancescope), a
read-only workbench for LanceDB.

## The one rule

Every claim on this page arrives as a number with a source. `app/data/measurements.ts`
holds all of them, each with a `source` field naming the file in
[mrlynn/lancescope](https://github.com/mrlynn/lancescope) it was measured in, and
each rendered as a footnote under the block that uses it.

Nothing is rounded for effect and nothing is invented. If a figure cannot be
sourced, it does not go on the page. The product's own documentation sets the
standard the site is held to: *"that is hard to believe from a description and
trivial to believe from a counter, so the counter is on screen."*

## Running it

```bash
npm install
npm run dev
```

## Two things that will drift

This repository is deliberately separate from the app, which means two copies are
kept in step by hand rather than by CI:

- **`app/globals.css`** — the palette is copied from `web/app/globals.css` in the
  app repo, where the contrast ratios are measured and commented. Change one,
  change the other.
- **`brand/mark.svg`** — the same mark that `scripts/gen_icons.py` renders the app
  icons from. Its comment carries the test any change has to pass: render it in
  one colour at 14px and check it is still not the LanceDB mark.

## The download button

`app/lib/release.ts` reads the latest release from the GitHub API, revalidated
hourly, and falls back to the releases page when that is unreachable — the button
then renders without a version chip rather than pointing at nothing. `/download`
is a stable redirect to the current DMG, for talks and QR codes that should not
name a tag.

## Not affiliated

LanceScope is an independent tool. It is not affiliated with, or supported by,
LanceDB. The dot lattice in the mark is derived from theirs, with thanks; the
glass is ours. LanceDB is a trademark of its owner.
