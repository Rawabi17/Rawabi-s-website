// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "rawabisgameproject.firebaseapp.com",
  databaseURL: "https://rawabisgameproject-default-rtdb.firebaseio.com/",
  projectId: "rawabisgameproject",
  storageBucket: "rawabisgameproject.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the 'classic' and 'new' game sections in the database
const classicGamesRef = database.ref('classic');
const newGamesRef = database.ref('new');

// Form to add games
const form = document.getElementById('game-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const gameName = document.getElementById('game-name').value;
  const gameType = document.getElementById('game-type').value;

  if (gameType === 'classic') {
    classicGamesRef.push({
      name: gameName
    }).then(() => {
      alert('تم إضافة اللعبة إلى قسم الألعاب الكلاسيكية بنجاح');
    }).catch((error) => {
      console.error('Error adding classic game:', error);
    });
  } else if (gameType === 'new') {
    newGamesRef.push({
      name: gameName
    }).then(() => {
      alert('تم إضافة اللعبة إلى قسم الألعاب الحديثة بنجاح');
    }).catch((error) => {
      console.error('Error adding new game:', error);
    });
  }

  form.reset();
});

// Fetch and display the games in the 'classic' and 'new' sections
classicGamesRef.on('child_added', function (snapshot) {
  const game = snapshot.val();
  displayGame(game.name, 'classic-games');
});

newGamesRef.on('child_added', function (snapshot) {
  const game = snapshot.val();
  displayGame(game.name, 'new-games');
});

// Function to display the games
function displayGame(gameName, sectionId) {
  const section = document.getElementById(sectionId);
  const div = document.createElement('div');
  div.textContent = gameName;
  section.appendChild(div);
}
