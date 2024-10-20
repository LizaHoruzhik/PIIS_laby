function showShirtCards() {
    const container = document.getElementById('shirts-container');
    shirts.forEach(shirt => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = getFrontImageSrc(shirt);
        img.alt = shirt.name || 'Shirt Image';

        const title = document.createElement('h3');
        title.textContent = shirt.name || 'Unnamed Shirt';

        const colors = document.createElement('p');
        const colorsCount = Object.keys(shirt.colors).length;
        const colorsText = `Доступно цветов: ${colorsCount}`;
        colors.textContent = colorsText;

        const quickViewButton = document.createElement('button');
        quickViewButton.className = 'button';
        quickViewButton.textContent = 'Quick View';
        quickViewButton.onclick = () => openModal(shirt);

        const seePageButton = document.createElement('button');
        seePageButton.className = 'button';
        seePageButton.textContent = 'See Page';
        seePageButton.onclick = () => {
            localStorage.setItem('selectedShirt', JSON.stringify(shirt)); // Сохраняем данные о майке
            window.location.href = 'details.html'; // Переход на страницу деталей
        };

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';
        buttonsDiv.appendChild(quickViewButton);
        buttonsDiv.appendChild(seePageButton);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(colors);
        card.appendChild(buttonsDiv);
        
        container.appendChild(card);
    });
}

function getFrontImageSrc(shirt) {
    if (shirt.colors && Object.values(shirt.colors).length > 0) {
        return shirt.colors.white.front;
    }
    return shirt.default.front;
}

function getBackImageSrc(shirt) {
    if (shirt.colors && Object.values(shirt.colors).length > 0) {
        return shirt.colors.white.back;
    }
    return shirt.default.back;
}

function openModal(shirt) {
    const modal = document.getElementById("modal");
    document.getElementById("modal-title").textContent = shirt.name || 'Unnamed Shirt';
    document.getElementById("modal-description").textContent = shirt.description || 'Описание отсутствует';
    document.getElementById("modal-price").textContent = `Цена: ${shirt.price || 'Не указана'}`;

    document.getElementById("modal-front").src = getFrontImageSrc(shirt);
    document.getElementById("modal-back").src = getBackImageSrc(shirt);

    modal.style.display = "block";
}

const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

showShirtCards();