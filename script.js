// الحصول على العناصر من الصفحة
const gameForm = document.getElementById('game-form');
const classicGamesContainer = document.getElementById('classic-games-list');
const newGamesContainer = document.getElementById('new-games-list');

// التعامل مع إضافة الألعاب عند تقديم النموذج
gameForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameCategory = document.getElementById('game-category').value;
    const gameDescription = document.getElementById('game-description').value;

    addGame(gameName, gameCategory, gameDescription);
    gameForm.reset(); // إعادة تعيين النموذج بعد الإضافة
});

// وظيفة لإضافة لعبة
function addGame(name, category, description) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game';

    const gameImage = document.createElement('img');
    gameImage.src = 'images/default-image.png'; // استخدم صورة افتراضية
    gameImage.alt = name;
    gameImage.className = 'game-image';
    gameImage.dataset.name = name;
    gameImage.dataset.description = description;

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = name;

    const gameDescriptionElement = document.createElement('p');
    gameDescriptionElement.textContent = description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        gameDiv.remove();
    };

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameTitle);
    gameDiv.appendChild(gameDescriptionElement);
    gameDiv.appendChild(deleteButton);

    if (category === 'Classic') {
        classicGamesContainer.appendChild(gameDiv);
    } else {
        newGamesContainer.appendChild(gameDiv);
    }

    // إظهار معلومات اللعبة عند النقر على الصورة
    gameImage.addEventListener('click', function () {
        popupInfo.textContent = Name: ${name}, Description: ${description};
        popup.style.display = 'block';
    });
}

// نافذة منبثقة لعرض تفاصيل اللعبة
const popup = document.createElement('div');
popup.classList.add('popup');
document.body.appendChild(popup);

const closePopup = document.createElement('span');
closePopup.textContent = 'X';
closePopup.classList.add('close-popup');
popup.appendChild(closePopup);

const popupInfo = document.createElement('p');
popup.appendChild(popupInfo);

closePopup.addEventListener('click', function () {
    popup.style.display = 'none';
});

// تنسيق النافذة المنبثقة
popup.style.display = 'none';
popup.style.position = 'fixed';
popup.style.top = '50%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.backgroundColor = 'white';
popup.style.padding = '20px';
popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

closePopup.style.cursor = 'pointer';
closePopup.style.position = 'absolute';
closePopup.style.top = '10px';
closePopup.style.right = '10px';
