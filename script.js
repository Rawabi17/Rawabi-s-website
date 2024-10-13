const gameForm = document.getElementById('game-form');
const classicGamesContainer = document.getElementById('classic-games');
const newGamesContainer = document.getElementById('new-games');

gameForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-type').value;

    addGame(gameName, gameType);
    gameForm.reset();
});

function addGame(name, type) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game';

    const gameTitle = document.createElement('h3');
    gameTitle.textContent = name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        gameDiv.remove();
    };

    gameDiv.appendChild(gameTitle);
    gameDiv.appendChild(deleteButton);

    if (type === 'classic') {
        classicGamesContainer.appendChild(gameDiv);
    } else {
        newGamesContainer.appendChild(gameDiv);
    }
}
