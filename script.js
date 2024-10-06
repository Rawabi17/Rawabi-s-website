// إعداد Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// عرض الألعاب المضافة
const gamesContainer = document.getElementById('games-container');

// تحميل الألعاب من Firebase وعرضها
function loadGames() {
    const database = firebase.database();
    database.ref('/games').on('value', (snapshot) => {
        gamesContainer.innerHTML = ''; // تفريغ المحتوى الحالي
        snapshot.forEach((childSnapshot) => {
            const gameData = childSnapshot.val();
            const gameId = childSnapshot.key;
            const gameDiv = document.createElement('div');
            gameDiv.classList.add('game');

            gameDiv.innerHTML = `
                <h3>${gameData.name}</h3>
                <img src="${gameData.image}" alt="${gameData.name}" class="game-image" />
                <p>${gameData.description}</p>
                <button class="delete-btn" data-id="${gameId}">حذف اللعبة</button>
            `;

            gamesContainer.appendChild(gameDiv);
        });

        // إضافة وظيفة حذف اللعبة
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', function() {
                const gameId = this.getAttribute('data-id');
                database.ref('/games/' + gameId).remove().then(() => {
                    console.log('Game removed successfully');
                }).catch((error) => {
                    console.error('Error removing game:', error);
                });
            });
        });
    });
}

// استدعاء الدالة لتحميل الألعاب عند تحميل الصفحة
loadGames();

// معالجة إرسال النموذج
const gameForm = document.getElementById('game-form');
gameForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // الحصول على قيم المدخلات
    const gameName = document.getElementById('game-name').value;
    const gameImage = document.getElementById('game-image').value;
    const gameDescription = document.getElementById('game-description').value;

    // إضافة اللعبة إلى Firebase
    const database = firebase.database();
    database.ref('/games').push({
        name: gameName,
        image: gameImage,
        description: gameDescription
    }).then(() => {
        console.log('Game added successfully');
        gameForm.reset();
    }).catch((error) => {
        console.error('Error adding game:', error);
    });
});
