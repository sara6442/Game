# Closet Friend — Dress-Up Game

A simple, kid-safe paper-doll dress-up game. The model is a line-art body that
is **always modestly dressed** — clothing layers are added on top, never
removed down to nothing.

## How it works

- `index.html` / `style.css` / `script.js` — the game itself.
- `assets/body/body.png` — the base model (your uploaded image).
- `assets/catalog.js` — **the only file you need to edit to add new clothes.**
  Each entry lists an id, display name, file path, stacking "layer" number,
  and a swatch color for its thumbnail.
- `assets/hair`, `assets/tops`, `assets/bottoms`, `assets/dresses`,
  `assets/accessories`, `assets/backgrounds` — one folder per category, one
  SVG per item.

The game reads `catalog.js`, builds the category tabs and the grid of
squares automatically, and stacks whatever the player picks on top of the
body in this fixed order (back to front):

```
background → body → bottoms/dress → tops → hair → accessories
```

Picking a **dress** automatically clears any chosen top/bottom (and vice
versa) so pieces never fight each other.

## About fitting clothes to the body (your question)

Pulling random clothing art from the internet won't reliably line up with
this exact body — every artist draws shoulders/waist/hip width a little
differently, so a random PNG will float or clip. The fix used here: every
item is hand-drawn in the *same coordinate space* as the body
(`viewBox="0 0 261 618"`, matching `body.png`'s pixel size exactly), so it
always lines up.

The "smart layering" you asked about (a dress slit so legs still show, a
V-neck top that doesn't cover the neck) **is implemented**, but it works
because each asset is drawn to respect those boundaries on purpose — it's
not something that can be done automatically for an arbitrary downloaded
image. The included `dress1.svg` has a slit polygon that restores the
skin tone over the leg under the hem, and `top1.svg` stops short of the
collarbone, as examples to copy.

## Adding more clothes

1. Draw or export a new SVG at `viewBox="0 0 261 618"` (same as `body.png`).
2. Save it in the matching folder (e.g. `assets/tops/top2.svg`).
3. Add a line for it in `assets/catalog.js`:
   ```js
   { id: "top2", name: "Striped Tee", file: "tops/top2.svg", layer: 30, swatch: "#BFE6D1" }
   ```
4. Refresh the page — it appears in the grid automatically, no other code
   changes needed.

For hair, add `recolorable: true` and give the colorable shapes the CSS
class `hairFill` so the color-picker row can swap their fill.

## Running locally

Because the game `fetch()`s the SVG files (so it can recolor hair), open it
through a local server rather than double-clicking the HTML file:

```bash
cd dressup-game
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing on GitHub Pages

1. Push this folder's contents to a GitHub repo.
2. Repo Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your game will be live at `https://<username>.github.io/<repo>/`.
