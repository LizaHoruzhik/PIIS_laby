document.querySelectorAll('.target').forEach(target => {
    let isMoving = false;
    let isPinned = false;
    let deltaX, deltaY;
    let originalPosition = {top: 0, left: 0};

    target.addEventListener('mousedown', (event) => {
        if (!isPinned) {
            isMoving = true;
            originalPosition.top = target.style.top;
            originalPosition.left = target.style.left;
            deltaX = event.clientX - target.getBoundingClientRect().left;
            deltaY = event.clientY - target.getBoundingClientRect().top;
        }   
    });

    target.addEventListener('dblclick', () => {
        isPinned = !isPinned;
        if (isPinned) {
            originalPosition.top = target.style.top;
            originalPosition.left = target.style.left;
            target.style.backgroundColor = 'blue'; // Меняем цвет при "приклеивании"
        } else {
            target.style.backgroundColor = 'red'; // Возвращаем цвет
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (isMoving) {
            target.style.left = `${event.clientX - deltaX}px`;
            target.style.top = `${event.clientY - deltaY}px`;
        } else if (isPinned) {
            target.style.left = `${event.clientX - deltaX}px`;
            target.style.top = `${event.clientY - deltaY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isMoving = false;
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && (isMoving || isPinned)) {
            target.style.top = originalPosition.top;
            target.style.left = originalPosition.left;
            isMoving = false;
            isPinned = false;
            target.style.backgroundColor = 'red'; // Возвращаем цвет
        }
    });
});