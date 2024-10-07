// Firebase Configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// مرجع قاعدة البيانات
const database = firebase.database();

// Function to load games from Firebase
function loadGames() {
    const classicGamesDiv = document.getElementById('classic-games');
    const newGamesDiv = document.getElementById('new-games');

    // Clear previous games
    classicGamesDiv.innerHTML = '';
    newGamesDiv.innerHTML = '';

    // Load classic games
    database.ref('classic').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const gameData = childSnapshot.val();
            const gameDiv = document.createElement('div');
            gameDiv.textContent = gameData.name;
            classicGamesDiv.appendChild(gameDiv);
        });
    });

    // Load new games
    database.ref('new').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const gameData = childSnapshot.val();
            const gameDiv = document.createElement('div');
            gameDiv.textContent = gameData.name;
            newGamesDiv.appendChild(gameDiv);
        });
    });
}

// Call loadGames on page load
window.onload = loadGames;

// Function to handle form submission
document.getElementById('game-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-type').value;

    if (gameName === '') {
        alert('يرجى إدخال اسم اللعبة');
        return;
    }

    // إدخال البيانات إلى قاعدة البيانات
    database.ref(gameType).push({
        name: gameName
    }).then(() => {
        alert('تم إضافة اللعبة بنجاح!');
        document.getElementById('game-name').value = ''; // مسح حقل الإدخال
        loadGames(); // تحميل الألعاب بعد الإضافة
    }).catch((error) => {
        console.error('خطأ في إضافة اللعبة: ', error);
    });
});

// Function to show game info in popup
document.querySelectorAll('.game-image').forEach(function(image) {
    image.addEventListener('click', function() {
        const gameInfo = image.getAttribute('data-info');
        const popup = document.getElementById('popup');
        const popupInfo = document.getElementById('popup-info');
        popupInfo.textContent = gameInfo;
        popup.style.display = 'block';
    });
});

// Close popup
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});
