const svg = document.getElementById('drawingArea');
const colorPicker = document.getElementById('colorPicker');
let isDrawing = false;
let startX, startY;
let tempShape = null;

svg.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;

    const shapeType = document.querySelector('input[name="shape"]:checked').value;
    const fillColor = colorPicker.value;
    if (shapeType === 'circle') {
        tempShape = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        tempShape.setAttribute('cx', startX);
        tempShape.setAttribute('cy', startY);
        tempShape.setAttribute('r', 0);
        tempShape.setAttribute('fill', fillColor);
        tempShape.setAttribute('stroke', fillColor);
        svg.appendChild(tempShape);
    } else if (shapeType === 'rectangle') {
        tempShape = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        tempShape.setAttribute('x', startX);
        tempShape.setAttribute('y', startY);
        tempShape.setAttribute('width', 0);
        tempShape.setAttribute('height', 0);
        tempShape.setAttribute('fill', fillColor);
        tempShape.setAttribute('stroke', fillColor);
        svg.appendChild(tempShape);
    }
});

svg.addEventListener('mousemove', (event) => {
    if (!isDrawing || !tempShape) return;

    const endX = event.offsetX;
    const endY = event.offsetY;

    const shapeType = document.querySelector('input[name="shape"]:checked').value;

    if (shapeType === 'circle') {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        tempShape.setAttribute('r', radius);
    } else if (shapeType === 'rectangle') {
        const width = endX - startX;
        const height = endY - startY;
        tempShape.setAttribute('x', Math.min(startX, endX));
        tempShape.setAttribute('y', Math.min(startY, endY));
        tempShape.setAttribute('width', Math.abs(width));
        tempShape.setAttribute('height', Math.abs(height));
    }
});

svg.addEventListener('mouseup', () => {
    isDrawing = false;
    tempShape = null;
});

svg.addEventListener('mouseleave', () => {
    isDrawing = false;
    tempShape = null;
});

document.getElementById('clearButton').addEventListener('click', () => {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
});