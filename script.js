const gameForm = document.getElementById('game-form');
const classicGamesContainer = document.getElementById('classic-games');
const newGamesContainer = document.getElementById('new-games');

gameForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-category').value;

    addGame(gameName, gameType);
    gameForm.reset();
});

function addGame(name, type) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game';

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = name;

    const gameTypeElement = document.createElement('p');
    gameTypeElement.textContent = نوع اللعبة: ${type}; // إظهار نوع اللعبة

    const gameDescription = document.createElement('p');
    gameDescription.textContent = 'وصف اللعبة'; // يمكنك تعديل الوصف حسب الحاجة

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        gameDiv.remove();
    };

    gameDiv.appendChild(gameTitle);
    gameDiv.appendChild(gameTypeElement); // إضافة نوع اللعبة
    gameDiv.appendChild(gameDescription);
    gameDiv.appendChild(deleteButton);

    if (type === 'Classic') {
        classicGamesContainer.appendChild(gameDiv);
    } else {
        newGamesContainer.appendChild(gameDiv);
    }
}
