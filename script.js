// Initialize Firebase
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

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Add Game Function
document.getElementById('addGameBtn').addEventListener('click', function() {
    const gameName = document.getElementById('gameName').value;
    const gameCategory = document.getElementById('gameCategory').value;
    const gameDescription = document.getElementById('description').value;

    // Validate inputs
    if (!gameName || !gameCategory || !gameDescription) {
        alert("Please fill in all fields");
        return;
    }

    const newGameRef = database.ref('games/' + gameCategory).push();
    newGameRef.set({
        name: gameName,
        description: gameDescription
    })
    .then(() => {
        alert("Game added successfully!");
        document.getElementById('gameName').value = '';
        document.getElementById('description').value = '';
        loadGames(); // Load games again to refresh the list
    })
    .catch((error) => {
        console.error("Error adding game: ", error);
    });
});

// Load games from Firebase
function loadGames() {
    const classicGamesRef = database.ref('games/classic');
    const newGamesRef = database.ref('games/new');

    classicGamesRef.on('value', (snapshot) => {
        const games = snapshot.val();
        const classicGamesList = document.getElementById('classic-games');
        classicGamesList.innerHTML = '';
        for (let key in games) {
            const game = games[key];
            classicGamesList.innerHTML += <div>${game.name} - ${game.description}</div>;
        }
    });

    newGamesRef.on('value', (snapshot) => {
        const games = snapshot.val();
        const newGamesList = document.getElementById('new-games');
        newGamesList.innerHTML = '';
        for (let key in games) {
            const game = games[key];
            newGamesList.innerHTML += <div>${game.name} - ${game.description}</div>;
        }
    });
}

// Call loadGames on page load
loadGames();
