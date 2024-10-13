const gameForm = document.getElementById('game-form');
const classicGamesContainer = document.getElementById('classic-games');
const newGamesContainer = document.getElementById('new-games');
const popup = document.getElementById('popup');
const popupInfo = document.getElementById('popup-info');
const closePopup = document.querySelector('.close');

gameForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-category').value; // تم التعديل هنا

    addGame(gameName, gameType);
    gameForm.reset();
});

function addGame(name, type) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game';

    const gameImage = document.createElement('img');
    gameImage.src = 'images/default-image.png'; // استخدم صورة افتراضية
    gameImage.alt = name;
    gameImage.className = 'game-image';
    gameImage.dataset.info = 'وصف اللعبة'; // يمكنك تعديل الوصف حسب الحاجة

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = name;

    const gameDescription = document.createElement('p');
    gameDescription.textContent = 'وصف اللعبة'; // يمكنك تعديل الوصف حسب الحاجة

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        gameDiv.remove();
    };

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameTitle);
    gameDiv.appendChild(gameDescription);
    gameDiv.appendChild(deleteButton);

    if (type === 'Classic') {
        classicGamesContainer.appendChild(gameDiv);
    } else {
        newGamesContainer.appendChild(gameDiv);
    }
}

// إظهار معلومات اللعبة عند النقر على الصورة
document.querySelectorAll('.game-image').forEach(image => {
    image.addEventListener('click', function () {
        popupInfo.textContent = image.dataset.info;
        popup.style.display = 'block';
    });
});

// إغلاق النافذة المنبثقة
closePopup.addEventListener('click', function () {
    popup.style.display = 'none';
});
