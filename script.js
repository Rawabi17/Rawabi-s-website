// إعداد Firebase
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

// تهيئة التطبيق
firebase.initializeApp(firebaseConfig);

// مرجع قاعدة البيانات
const database = firebase.database();

// إضافة لعبة جديدة
document.getElementById('game-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-type').value;

    // إدخال البيانات إلى قاعدة البيانات
    database.ref(gameType).push({
        name: gameName,
    }).then(() => {
        alert('تم إضافة اللعبة بنجاح!');
        document.getElementById('game-name').value = ''; // مسح حقل الإدخال
        loadGames(); // تحميل الألعاب بعد الإضافة
    }).catch((error) => {
        console.error('خطأ في إضافة اللعبة: ', error);
    });
});

// تحميل الألعاب من قاعدة البيانات
function loadGames() {
    const classicGamesRef = database.ref('classic');
    const newGamesRef = database.ref('new');

    classicGamesRef.on('value', (snapshot) => {
        const games = snapshot.val();
        document.getElementById('classic-games').innerHTML = '';
        for (let id in games) {
            const game = games[id];
            document.getElementById('classic-games').innerHTML += <div>${game.name}</div>;
        }
    });

    newGamesRef.on('value', (snapshot) => {
        const games = snapshot.val();
        document.getElementById('new-games').innerHTML = '';
        for (let id in games) {
            const game = games[id];
            document.getElementById('new-games').innerHTML += <div>${game.name}</div>;
        }
    });
}

// تحميل الألعاب عند تحميل الصفحة
loadGames();
