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

## The screenshots

`public/shots` holds nine images of the console, and they come from two places.

Five are the app's own documentation images, copied from `docs/assets` in
[mrlynn/lancescope](https://github.com/mrlynn/lancescope) and taken against the
16-talk reference corpus. Four were captured from
[demo.lancescope.mlynn.dev](https://demo.lancescope.mlynn.dev) on 6 September 2026
— the same build the DMG carries, pinned to a public MNIST table it reads over
`hf://` — so the numbers on them are a live read of somebody else's data.

All nine show the console in its **light** theme, which is the theme its own
documentation uses. A set that changed theme halfway would read as two products,
and `.shot` in `app/globals.css` is what carries a light screenshot on a dark page.

`app/data/measurements.ts` holds their alt text and captions beside every other
figure on the site, under the same rule: a caption says what is on the screen and
what that read cost. A screenshot with no number on it is the one element of this
page arguing from a picture.

## Three things that will drift

This repository is deliberately separate from the app, which means these copies are
kept in step by hand rather than by CI:

- **`app/globals.css`** — the palette is copied from `web/app/globals.css` in the
  app repo, where the contrast ratios are measured and commented. Change one,
  change the other.
- **`brand/mark.svg`** — the same mark that `scripts/gen_icons.py` renders the app
  icons from. Its comment carries the test any change has to pass: render it in
  one colour at 14px and check it is still not the LanceDB mark.
- **`public/shots`** — a screenshot is a claim with a date on it. When a screen in
  the console changes shape, the shot of it here is wrong and nothing will say so.
  Re-take it from the same place it came from, and re-read the caption: the caption
  quotes a byte count off the screen, so a new capture usually means a new number.

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
