document.querySelectorAll('.target').forEach(target => {
    let isMoving = false;
    let isPinned = false;
    let deltaX, deltaY;
    let originalPosition = {top: 0, left: 0};
    const startMoving = (event) => {
        const currentTime = Date.now();
    
    if (event.touches.length === 1) {
        // Одно касание
        if (!isPinned) {
            isMoving = true;
            originalPosition.top = target.style.top;
            originalPosition.left = target.style.left;

            const clientX = event.touches[0].clientX;
            const clientY = event.touches[0].clientY;

            deltaX = clientX - target.getBoundingClientRect().left;
            deltaY = clientY - target.getBoundingClientRect().top;
        }
    } else 
        // Двойное касание
        if (currentTime - lastTouchTime < 300) {
            isPinned = !isPinned;
            if (isPinned) {
                originalPosition.top = target.style.top;
                originalPosition.left = target.style.left;
                target.style.backgroundColor = 'blue'; // Меняем цвет при "приклеивании"
            } else {
                target.style.backgroundColor = 'red'; // Возвращаем цвет
            }
        }
        lastTouchTime = currentTime;
    };

    target.addEventListener('mousedown', (event) => {
        if (!isPinned) {
            isMoving = true;
            originalPosition.top = target.style.top;
            originalPosition.left = target.style.left;
            deltaX = event.clientX - target.getBoundingClientRect().left;
            deltaY = event.clientY - target.getBoundingClientRect().top;
        }   
    });

    target.addEventListener('touchstart', startMoving);

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

    const moveTarget = (event) => {
        if (isMoving || isPinned) {
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;

            target.style.left = `${clientX - deltaX}px`;
            target.style.top = `${clientY - deltaY}px`;
        }
    };

    document.addEventListener('mousemove', moveTarget);
    document.addEventListener('touchmove', moveTarget);

    document.addEventListener('mouseup', () => {
        isMoving = false;
    });

    document.addEventListener('touchend', (event) => {
        isMoving = false;
    });

    const resetPosition = () => {
        // Если мы уже перетаскиваем элемент и добавился второй палец
        target.style.top = originalPosition.top;
        target.style.left = originalPosition.left;
        isMoving = false;
        isPinned = false;
        target.style.backgroundColor = 'red'; // Возвращаем цвет
    }

    document.addEventListener('touchstart', (event) => {
        if ((isMoving || isPinned) && event.touches.length > 1) {
            resetPosition();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && (isMoving || isPinned)) {
            resetPosition();
        }
    });
});