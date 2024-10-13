const gameForm = document.getElementById('game-form');
const classicGamesContainer = document.getElementById('classic-games');
const newGamesContainer = document.getElementById('new-games');
const popup = document.getElementById('popup');
const popupInfo = document.getElementById('popup-info');
const closePopup = document.querySelector('.close');

gameForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-category').value;
    const gameImage = document.getElementById('game-image').value; // إضافة رابط الصورة
    const gameDescription = document.getElementById('game-description').value; // إضافة الوصف

    addGame(gameName, gameType, gameImage, gameDescription);
    gameForm.reset();
});

function addGame(name, type, image, description) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game';

    const gameImage = document.createElement('img');
    gameImage.src = image; // استخدام رابط الصورة المدخل
    gameImage.alt = name;
    gameImage.className = 'game-image';

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = name;

    const gameDescription = document.createElement('p');
    gameDescription.textContent = description; // استخدام الوصف المدخل

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        gameDiv.remove();
    };

    gameDiv.append### 3. *script.js* (continued)

```javascript
    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameTitle);
    gameDiv.appendChild(gameDescription);
    gameDiv.appendChild(deleteButton);

    if (type === 'classic') {
        classicGamesContainer.appendChild(gameDiv);
    } else {
        newGamesContainer.appendChild(gameDiv);
    }
}

// Show game info when clicking on the image
document.querySelectorAll('.game-image').forEach(image => {
    image.addEventListener('click', function () {
        popupInfo.textContent = image.dataset.info;
        popup.style.display = 'block';
    });
});

// Close the popup
closePopup.addEventListener('click', function () {
    popup.style.display = 'none';
});
