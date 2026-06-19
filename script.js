/* script.js — dress-up game logic
   Builds the category tabs + item grid from CATALOG (see assets/catalog.js)
   and stacks the chosen pieces on top of the body in fixed z-order, so a
   player can never end up with an undressed view: the body image underneath
   is already modestly dressed, and every clothing layer fully covers the
   regions it owns.

   All layers are plain <img> tags (no fetch()), so this works straight from
   a double-clicked index.html, a local server, or GitHub Pages alike.
*/

const ASSET_BASE = "assests/";

const CATEGORIES = [
  { key: "background",  catalogKey: "backgrounds",  label: "Room",       icon: "🏠" },
  { key: "hair",         catalogKey: "hair",         label: "Hair",       icon: "💇" },
  { key: "top",          catalogKey: "tops",         label: "Tops",       icon: "👚" },
  { key: "bottom",       catalogKey: "bottoms",      label: "Skirts",     icon: "👗" },
  { key: "dress",        catalogKey: "dresses",      label: "Dresses",    icon: "💃" },
  { key: "accessory",    catalogKey: "accessories",  label: "Extras",     icon: "🎀" }
];

/* categories where picking "None" is allowed (background/hair always show something) */
const OPTIONAL = new Set(["top", "bottom", "dress", "accessory"]);

let activeCategory = "top";

let selection = {
  background: "bg1",
  hair: "hair1",
  top: "top1",
  bottom: "bottom1",
  dress: null,
  accessory: null,
  hairColorIndex: 0
};

function findItem(catalogKey, id){
  if(!id) return null;
  return CATALOG[catalogKey].find(it => it.id === id) || null;
}

function categoryFor(key){
  return CATEGORIES.find(c => c.key === key);
}

/* ---------- rendering the doll ---------- */

function renderDoll(){
  const doll = document.getElementById("doll");
  doll.innerHTML = "";

  const layers = [];

  const bg = findItem("backgrounds", selection.background);
  if(bg) layers.push({ file: bg.file, z: 0 });

  layers.push({ file: "body/body.png", z: 10 });

  // dresses replace tops + bottoms so nothing doubles up oddly
  if(selection.dress){
    const d = findItem("dresses", selection.dress);
    layers.push({ file: d.file, z: d.layer });
  } else {
    const b = findItem("bottoms", selection.bottom);
    if(b) layers.push({ file: b.file, z: b.layer });
    const t = findItem("tops", selection.top);
    if(t) layers.push({ file: t.file, z: t.layer });
  }

  const h = findItem("hair", selection.hair);
  if(h) layers.push({ file: h.file, z: h.layer, recolor: h.recolorable });

  const a = findItem("accessories", selection.accessory);
  if(a) layers.push({ file: a.file, z: a.layer });

  layers.forEach(layer => {
    const img = document.createElement("img");
    img.src = ASSET_BASE + layer.file;
    img.style.zIndex = layer.z;
    if(layer.recolor){
      img.style.filter = HAIR_COLORS[selection.hairColorIndex].filter;
    }
    doll.appendChild(img);
  });

  document.getElementById("hairColorRow").classList.toggle("hidden", !h || !h.recolorable);
}

/* ---------- hair color swatches ---------- */

function renderHairSwatches(){
  const row = document.getElementById("hairSwatches");
  row.innerHTML = "";
  HAIR_COLORS.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "swatch-btn" + (i === selection.hairColorIndex ? " selected" : "");
    b.style.background = "#7a5230";
    b.style.filter = c.filter;
    b.title = c.name;
    b.addEventListener("click", () => {
      selection.hairColorIndex = i;
      renderHairSwatches();
      renderDoll();
    });
    row.appendChild(b);
  });
}

/* ---------- category tabs ---------- */

function renderTabs(){
  const tabs = document.getElementById("categoryTabs");
  tabs.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (cat.key === activeCategory ? " active" : "");
    btn.textContent = `${cat.icon} ${cat.label}`;
    btn.addEventListener("click", () => {
      activeCategory = cat.key;
      renderTabs();
      renderGrid();
    });
    tabs.appendChild(btn);
  });
}

/* ---------- item grid for the active category ---------- */

function renderGrid(){
  const grid = document.getElementById("itemGrid");
  grid.innerHTML = "";
  const cat = categoryFor(activeCategory);
  const items = CATALOG[cat.catalogKey];

  if(OPTIONAL.has(cat.key)){
    const noneCard = document.createElement("div");
    noneCard.className = "item-card none-card" + (!selection[cat.key] ? " selected" : "");
    noneCard.innerHTML = `<div class="swatch-dot" style="background:#fff;border:2px dashed #ccc;"></div><div class="label">None</div>`;
    noneCard.addEventListener("click", () => {
      selection[cat.key] = null;
      renderGrid();
      renderDoll();
    });
    grid.appendChild(noneCard);
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card" + (selection[cat.key] === item.id ? " selected" : "");
    card.innerHTML = `<div class="swatch-dot" style="background:${item.swatch};"></div><div class="label">${item.name}</div>`;
    card.addEventListener("click", () => {
      selection[cat.key] = item.id;
      // wearing a dress clears separate top/bottom, and vice versa
      if(cat.key === "dress" && item.id) { selection.top = null; selection.bottom = null; }
      if((cat.key === "top" || cat.key === "bottom") && item.id) { selection.dress = null; }
      renderTabs();
      renderGrid();
      renderDoll();
    });
    grid.appendChild(card);
  });
}

/* ---------- toolbar actions ---------- */

function randomize(){
  CATEGORIES.forEach(cat => {
    const items = CATALOG[cat.catalogKey];
    const pool = OPTIONAL.has(cat.key) ? [null, ...items.map(i => i.id)] : items.map(i => i.id);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    selection[cat.key] = pick;
  });
  if(selection.dress){ selection.top = null; selection.bottom = null; }
  selection.hairColorIndex = Math.floor(Math.random() * HAIR_COLORS.length);
  renderTabs();
  renderGrid();
  renderHairSwatches();
  renderDoll();
}

function resetAll(){
  selection = {
    background: "bg1",
    hair: "hair1",
    top: "top1",
    bottom: "bottom1",
    dress: null,
    accessory: null,
    hairColorIndex: 0
  };
  renderTabs();
  renderGrid();
  renderHairSwatches();
  renderDoll();
}

document.getElementById("randomizeBtn").addEventListener("click", randomize);
document.getElementById("resetBtn").addEventListener("click", resetAll);

renderTabs();
renderGrid();
renderHairSwatches();
renderDoll();
