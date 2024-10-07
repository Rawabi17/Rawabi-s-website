console.log("Script is loaded correctly");
console.log("Trying to add a new game");

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // استبدلها بالمفتاح الصحيح
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// عند تقديم النموذج
document.getElementById('game-form').addEventListener('submit', function(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة

  const gameName = document.getElementById('game-name').value;
  const gameImage = document.getElementById('game-image').value; // تأكد من إضافة هذا المدخل في النموذج إذا كنت تستخدمه
  const gameDescription = document.getElementById('game-description').value; // تأكد من إضافة هذا المدخل في النموذج إذا كنت تستخدمه
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

    // عرض اللعبة المضافة على الصفحة
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
