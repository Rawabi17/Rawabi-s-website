console.log("Script is loaded correctly");
console.log("Trying to add a new game");

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxDcjYmxgO-lj6zlV7WujIRLnM9JmStTQ",
  authDomain: "rawabisgameproject.firebaseapp.com",
  databaseURL: "https://rawabisgameproject-default-rtdb.firebaseio.com/",
  projectId: "rawabisgameproject",
  storageBucket: "rawabisgameproject.appspot.com",
  messagingSenderId: "133813029183",
  appId: "1:133813029183:web:317e481a9c380fe0c4ab8a",
  measurementId: "G-XZCDX66F15"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// عند تقديم النموذج
document.getElementById('game-form').addEventListener('submit', function(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة

  const gameName = document.getElementById('game-name').value;
  const gameImage = document.getElementById('game-image').value;
  const gameDescription = document.getElementById('game-description').value;
  const gameType = document.getElementById('game-type').value;

  // إضافة اللعبة إلى Firebase
  const newGameRef = firebase.database().ref('games/' + gameType).push(); // استخدام نوع اللعبة كجزء من المسار
  newGameRef.set({
    name: gameName,
    image: gameImage,
    description: gameDescription
  }).then(() => {
    console.log('Game added successfully');
    alert('تم إضافة اللعبة بنجاح!');

    // استدعاء دالة لعرض اللعبة المضافة على الصفحة
    displayGame(gameType, gameName, gameImage, gameDescription);
  }).catch((error) => {
    console.error('Error adding game:', error);
  });

  // إعادة تعيين النموذج بعد الإضافة
  this.reset();
});

// دالة لعرض اللعبة المضافة
function displayGame(type, name, image, description) {
  const gameList = document.getElementById(type === 'classic' ? 'classic-games' : 'new-games');
  const gameItem = document.createElement('div');
  gameItem.innerHTML = `
    <h3>${name}</h3>
    <img src="${image}" alt="${name}" />
    <p>${description}</p>
  `;
  gameList.appendChild(gameItem);
}
