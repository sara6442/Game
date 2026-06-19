// Simple lists of asset paths
const tops = [
  "assets/tops/top1.png",
  "assets/tops/top2.png"
];

const bottoms = [
  "assets/skirts/skirt1.png",
  "assets/skirts/skirt2.png"
];

const dresses = [
  "assets/dresses/dress1.png",
  "assets/dresses/dress2.png"
];

const hairs = [
  "assets/hair/hair1.png",
  "assets/hair/hair2.png"
];

const accessories = [
  "assets/accessories/necklace1.png",
  "assets/accessories/hat1.png"
];

const backgrounds = [
  "assets/backgrounds/bg1.png",
  "assets/backgrounds/bg2.png"
];

function createGrid(gridId, items, onClick) {
  const grid = document.getElementById(gridId);
  items.forEach(src => {
    const div = document.createElement("div");
    div.className = "grid-item";
    const img = document.createElement("img");
    img.src = src;
    div.appendChild(img);
    div.addEventListener("click", () => onClick(src));
    grid.appendChild(div);
  });
}

window.onload = () => {
  // Tops
  createGrid("tops-grid", tops, src => {
    document.getElementById("top").src = src;
    // If a dress is chosen, clear it
    document.getElementById("dress").src = "";
  });

  // Bottoms
  createGrid("bottoms-grid", bottoms, src => {
    document.getElementById("bottom").src = src;
    document.getElementById("dress").src = "";
  });

  // Dresses (usually replace top+bottom)
  createGrid("dresses-grid", dresses, src => {
    document.getElementById("dress").src = src;
    document.getElementById("top").src = "";
    document.getElementById("bottom").src = "";
  });

  // Hair
  createGrid("hair-grid", hairs, src => {
    document.getElementById("hair").src = src;
  });

  // Accessories
  createGrid("accessories-grid", accessories, src => {
    document.getElementById("accessory").src = src;
  });

  // Backgrounds
  createGrid("backgrounds-grid", backgrounds, src => {
    document.getElementById("background").src = src;
  });
};
