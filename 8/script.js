const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX, startY;
let shape = 'circle';
let shapes = [];
let currentColor = '#000000';

document.getElementById('colorPicker').addEventListener('input', (event) => {
    currentColor = event.target.value;
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShapes();

    ctx.beginPath();

    shape = document.querySelector('input[name="shape"]:checked').value;

    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor; 

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.rect(startX, startY, width, height);
        ctx.fill();
        ctx.stroke();
    }
});

const endMoving = (event) =>{
    if (!isDrawing) return;

    const endX = event.offsetX;
    const endY = event.offsetY;

    // Добавляем фигуру в массив
    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        shapes.push({ type: 'circle', x: startX, y: startY, radius: radius, color: currentColor });
    } else if (shape === 'rectangle') {
        const width = endX - startX;
        const height = endY - startY;
        shapes.push({ type: 'rectangle', x: startX, y: startY, width: width, height: height, color: currentColor });
    }

    isDrawing = false; // Завершаем рисование
    drawShapes(); // Перерисовываем все фигуры
}

canvas.addEventListener('mouseup', endMoving);

canvas.addEventListener('mouseleave', endMoving);

// Функция для отрисовки всех фигур
function drawShapes() {
    shapes.forEach(shape => {
        ctx.beginPath();
        ctx.strokeStyle = shape.color;
        ctx.fillStyle = shape.color;

        if (shape.type === 'circle') {
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (shape.type === 'rectangle') {
            ctx.rect(shape.x, shape.y, shape.width, shape.height);
            ctx.fill();
            ctx.stroke();
        }
    });
}

document.getElementById('clearBtn').addEventListener('click', () => {
    shapes = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});