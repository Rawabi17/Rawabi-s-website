console.log("Script is loaded correctly");

// إعدادات Firebase - مع تعديل الرابط
const firebaseConfig = {
  apiKey: "AIzaSyBxDcjYmxgO-lj6zlV7WujIRLnM9JmStTQ",
  authDomain: "rawabisgameproject.firebaseapp.com",
  databaseURL: "https://rawabisgameproject-default-rtdb.firebaseio.com", // تم تحديثه بالرابط الصحيح
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
  const gameType = document.getElementById('game-type').value;

  // إضافة اللعبة إلى Firebase
  const newGameRef = firebase.database().ref('games/' + gameType).push();
  newGameRef.set({
    name: gameName
  }).then(() => {
    console.log('Game added successfully');
    alert('تم إضافة اللعبة بنجاح!');

    // هنا نقوم بعرض اللعبة على الصفحة بعد إضافتها
    displayGame(gameType, gameName);
  }).catch((error) => {
    console.error('Error adding game:', error);
    alert('حدث خطأ أثناء إضافة اللعبة');
  });

  // إعادة تعيين النموذج بعد الإضافة
  this.reset();
});

// دالة لعرض اللعبة المضافة على الصفحة
function displayGame(type, name) {
  const gameList = document.getElementById(type === 'classic' ? 'classic-games' : 'new-games');
  const gameItem = document.createElement('div');
  gameItem.innerHTML = `
    <h3>${name}</h3>
  `;
  gameList.appendChild(gameItem);
}
