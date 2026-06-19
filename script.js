// THE DATA - You will replace the 'svg' strings with your actual drawn clothes
const itemsData = {
    tops: [
        { id: 't1', name: 'White Top', layer: 'top-layer', svg: '<rect x="90" y="180" width="120" height="120" fill="white" rx="10"/>' },
        { id: 't2', name: 'Red Top', layer: 'top-layer', svg: '<rect x="90" y="180" width="120" height="120" fill="red" rx="10"/>' }
    ],
    bottoms: [
        { id: 'b1', name: 'Grey Skirt', layer: 'bottom-layer', svg: '<path d="M100 300 L200 300 L220 600 L80 600 Z" fill="#e0e0e0"/>' }
    ],
    dresses: [
        { id: 'd1', name: 'Blue Dress', layer: 'bottom-layer', svg: '<path d="M80 180 L220 180 L230 600 L70 600 Z" fill="blue"/>' }
    ],
    hair: [
        { id: 'h1', name: 'Bun', layer: 'hair-front', svg: '<circle cx="150" cy="100" r="40" fill="brown"/>' }
    ],
    accessories: [
        { id: 'a1', name: 'Crown', layer: 'accessory-layer', svg: '<path d="M120 100 L130 70 L150 90 L170 70 L180 100 Z" fill="gold"/>' }
    ]
};

let currentCategory = 'tops';
let activeLayer = null; // Stores which layer is currently active for color changing

function switchCategory(category) {
    currentCategory = category;
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Clear and populate grid
    const grid = document.getElementById('item-grid');
    grid.innerHTML = '';
    
    itemsData[category].forEach(item => {
        const box = document.createElement('div');
        box.className = 'item-box';
        box.innerHTML = item.svg;
        box.onclick = () => wearItem(item);
        grid.appendChild(box);
    });
}

function wearItem(item) {
    const layer = document.getElementById(item.layer);
    layer.innerHTML = item.svg;
    activeLayer = layer; // Remember which layer we just changed
}

// Handle Color Changing
document.getElementById('colorPicker').addEventListener('input', function(e) {
    if(activeLayer) {
        // This simple example changes the FIRST element's fill color.
        // For complex SVGs, you would need to give specific IDs to the shapes you want to recolor.
        const svgElements = activeLayer.querySelectorAll('*');
        svgElements.forEach(el => {
            if(el.getAttribute('fill')) {
                el.setAttribute('fill', e.target.value);
            }
        });
    }
});

// Load default category
switchCategory('tops');
