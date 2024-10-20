const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

if (selectedShirt) {
    document.getElementById('shirt-title').textContent = selectedShirt.name || 'Unnamed Shirt';
    document.getElementById('shirt-description').textContent = selectedShirt.description || 'Описание отсутствует';
    document.getElementById('shirt-price').textContent = `${selectedShirt.price || 'Не указана'}`;

    let isFront = true; // Переменная для отслеживания текущей стороны
    let currentColor = Object.keys(selectedShirt.colors)[0]; // Устанавливаем начальный цвет

    function updateShirtImage() {
        const shirtImage = document.getElementById('shirt-image');
        shirtImage.src = isFront ? selectedShirt.colors[currentColor].front : selectedShirt.colors[currentColor].back;
    }

    updateShirtImage();

    const colorsDiv = document.getElementById('shirt-colors');
    colorsDiv.innerHTML = '';
    Object.keys(selectedShirt.colors).forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.style.backgroundColor = color;
        colorButton.className = 'color-button';
        
        // Обработчик события для изменения изображения
        colorButton.onclick = function() {
            currentColor = color;
            updateShirtImage();
        };

        colorsDiv.appendChild(colorButton);
    });

    // Обработчик для кнопки переворота
    document.getElementById('flip-button').onclick = function() {
        isFront = !isFront;
        updateShirtImage();
    };
}