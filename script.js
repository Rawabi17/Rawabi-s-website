<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Games Website | موقع الألعاب الخاص بي</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Firebase App (the core Firebase SDK) -->
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
        import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBxDcjYmxgO-lj6zlV7WujIRLnM9JmStTQ",
            authDomain: "rawabisgameproject.firebaseapp.com",
            databaseURL: "https://rawabisgameproject-default-rtdb.firebaseio.com",
            projectId: "rawabisgameproject",
            storageBucket: "rawabisgameproject.appspot.com",
            messagingSenderId: "133813029183",
            appId: "1:133813029183:web:317e481a9c380fe0c4ab8a",
            measurementId: "G-XZCDX66F15"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // التعامل مع إضافة الألعاب
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('game-form').addEventListener('submit', function (event) {
                event.preventDefault();

                const gameName = document.getElementById('game-name').value;
                const gameCategory = document.getElementById('game-category').value;
                const gameDescription = document.getElementById('game-description').value;

                const gameData = {
                    name: gameName,
                    category: gameCategory,
                    description: gameDescription,
                };

                // إضافة البيانات إلى قاعدة البيانات
                const newGameRef = ref(database, gameCategory).push();
                set(newGameRef, gameData)
                    .then(() => {
                        console.log('Game added successfully');
                        document.getElementById('game-form').reset();
                    })
                    .catch((error) => {
                        console.error('Error adding game:', error);
                    });
            });

            // جلب الألعاب من قاعدة البيانات
            fetchGames();
        });

        function fetchGames() {
            const classicGamesRef = ref(database, 'Classic');
            onValue(classicGamesRef, (snapshot) => {
                const classicGamesList = document.getElementById('classic-games-list');
                classicGamesList.innerHTML = '';
                snapshot.forEach((childSnapshot) => {
                    const game = childSnapshot.val();
                    const gameElement = document.createElement('div');
                    gameElement.innerHTML = <h3>${game.name}</h3><p>${game.description}</p>;
                    classicGamesList.appendChild(gameElement);
                });
            });

            const newGamesRef = ref(database, 'New');
            onValue(newGamesRef, (snapshot) => {
                const newGamesList = document.getElementById('new-games-list');
                newGamesList.innerHTML = '';
                snapshot.forEach((childSnapshot) => {
                    const game = childSnapshot.val();
                    const gameElement = document.createElement('div');
                    gameElement.innerHTML = <h3>${game.name}</h3><p>${game.description}</p>;
                    newGamesList.appendChild(gameElement);
                });
            });
        }
    </script>
</head>
<body>
    <header>
        <h1>Welcome to My Games Website | مرحبًا بكم في موقع الألعاب الخاص بي</h1>
    </header>

    <section>
        <h2>Add a recent Game | إضافة لعبة حديثة</h2>
        <form id="game-form">
            <label for="game-name">Game Name | اسم اللعبة:</label>
            <input type="text" id="game-name" required>

            <label for="game-category">Game Category | فئة اللعبة:</label>
            <select id="game-category">
                <option value="Classic">Classic | كلاسيكية</option>
                <option value="New">recent | حديثة</option>
            </select>

            <label for="game-description">Description | وصف اللعبة:</label>
            <textarea id="game-description" required></textarea>

            <button type="submit">Add Game | إضافة لعبة</button>
        </form>
    </section>

    <section class="game-category" id="classic-games">
        <h2>Classic Games | الألعاب الكلاسيكية</h2>
        <div id="classic-games-list"></div>
    </section>

    <section class="game-category" id="new-games">
        <h2>Recent Games | الألعاب الحديثة</h2>
        <div id="new-games-list"></div>
    </section>

    <footer>
        <p>All rights reserved to Rawabi Alshalahil ©️ 2024</p>
    </footer>
</body>
</html>
