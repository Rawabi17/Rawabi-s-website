const gameForm = document.getElementById("game-form");
const gameListClassic = document.getElementById("game-list-classic");
const gameListNew = document.getElementById("game-list-new");

gameForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("game-name").value;
  const image = document.getElementById("game-image").value;
  const description = document.getElementById("game-description").value;
  const type = document.getElementById("game-type").value;

  const newGame = {
    name: name,
    image: image,
    description: description,
    type: type
  };

  // إضافة اللعبة إلى Firebase
  database.ref('/games').push(newGame)
    .then(() => {
      // تحديث القائمة بعد الإضافة
      addGameToList(newGame);
      gameForm.reset(); // إعادة تعيين النموذج
    })
    .catch(error => {
      console.error("Error adding game: ", error);
    });
});

// دالة لإضافة اللعبة إلى القائمة
function addGameToList(game) {
  const gameItem = document.createElement("div");
  gameItem.innerHTML = `
    <h3>${game.name}</h3>
    <img src="${game.image}" alt="${game.name}" />
    <p>${game.description}</p>
    <button class="delete-button">حذف</button>
  `;

  // تحديد القائمة بناءً على نوع اللعبة
  const gameList = game.type === 'classic' ? gameListClassic : gameListNew;
  gameList.appendChild(gameItem);

  // إضافة وظيفة حذف اللعبة
  gameItem.querySelector(".delete-button").addEventListener("click", function() {
    gameList.removeChild(gameItem);
  });
}
