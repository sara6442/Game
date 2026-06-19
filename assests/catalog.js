/* catalog.js
   This is the single place you edit to add new clothes.
   Each item needs:
     id      – unique string
     name    – label shown to the player
     file    – path to its SVG/PNG, relative to assets/
     layer   – stacking order number (higher draws on top). Keep within the
               ranges below so new items automatically layer correctly.
     swatch  – a small flat color used for the thumbnail background

   Layer ranges (don't need to be exact, just stay in the band):
     background : 0
     body       : 10
     bottoms    : 20
     tops       : 30
     dresses    : 25   (dresses replace tops+bottoms, see script.js)
     hair       : 40
     accessories: 50
*/

const CATALOG = {
  backgrounds: [
    { id: "bg1", name: "Cozy Room", file: "backgrounds/background1.svg", layer: 0, swatch: "#FFF3E0" }
  ],
  tops: [
    { id: "top1", name: "Pink Blouse", file: "tops/top1.svg", layer: 30, swatch: "#F7B8C4" }
  ],
  bottoms: [
    { id: "bottom1", name: "Lilac Skirt", file: "bottoms/bottom1.svg", layer: 20, swatch: "#C9B6E4" }
  ],
  dresses: [
    { id: "dress1", name: "Sunshine Dress", file: "dresses/dress1.svg", layer: 25, swatch: "#F4C95D" }
  ],
  hair: [
    { id: "hair1", name: "Long Waves", file: "hair/hair1.svg", layer: 40, swatch: "#7a5230", recolorable: true }
  ],
  accessories: [
    { id: "accessory1", name: "Hair Bow", file: "accessories/accessory1.svg", layer: 50, swatch: "#F7B8C4" }
  ]
};

/* Hair colors the player can pick from when a hairstyle is recolorable.
   Each one is a CSS filter applied straight to the <img>, so recoloring
   works with plain <img> tags (no fetch, no server needed, works from a
   double-clicked file or any host). */
const HAIR_COLORS = [
  { name: "Brown",  filter: "none" },
  { name: "Black",  filter: "brightness(0.32) saturate(0.6)" },
  { name: "Blonde", filter: "sepia(1) saturate(2.2) brightness(1.35) hue-rotate(-10deg)" },
  { name: "Red",    filter: "sepia(1) saturate(4) brightness(0.95) hue-rotate(-30deg)" },
  { name: "Purple", filter: "sepia(1) saturate(3.5) brightness(0.85) hue-rotate(220deg)" },
  { name: "Teal",   filter: "sepia(1) saturate(3.5) brightness(0.8) hue-rotate(150deg)" },
  { name: "Pink",   filter: "sepia(1) saturate(2.5) brightness(1.15) hue-rotate(280deg)" }
];
