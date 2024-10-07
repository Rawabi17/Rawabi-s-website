document.getElementById("gameForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // احصل على قيمة الإدخالات
    const gameName = document.getElementById("gameName").value;
    const gameCategory = document.getElementById("gameCategory").value;
    const gameDescription = document.getElementById("gameDescription").value;

    // تحقق من أن جميع الحقول تم ملؤها
    if (gameName === "" || gameCategory === "" || gameDescription === "") {
        alert("Please fill in all fields | الرجاء ملء جميع الحقول");
        return;
    }

    // إضافة اللعبة إلى Firebase
    const gameData = {
        name: gameName,
        category: gameCategory,
        description: gameDescription
    };

    let gamesRef;

    if (gameCategory === "classic") {
        gamesRef = firebase.database().ref("classic");
    } else if (gameCategory === "new") {
        gamesRef = firebase.database().ref("new");
    }

    gamesRef.push(gameData)
        .then(() => {
            alert("Game added successfully! | تم إضافة اللعبة بنجاح!");

            // إعادة تعيين النموذج
            document.getElementById("gameForm").reset();

            // تحديث قائمة الألعاب
            fetchGames();
        })
        .catch((error) => {
            console.error("Error adding game: ", error);
        });
});

// عرض الألعاب
function fetchGames() {
    const classicGamesList = document.getElementById("classicGamesList");
    const newGamesList = document.getElementById("newGamesList");

    // تنظيف القوائم قبل التحديث
    classicGamesList.innerHTML = "";
    newGamesList.innerHTML = "";

    // إحضار الألعاب الكلاسيكية من Firebase
    firebase.database().ref("classic").once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const game = childSnapshot.val();
            const gameItem = document.createElement("div");
            gameItem.className = "game";
            gameItem.innerHTML = <h3>${game.name}</h3><p>${game.description}</p>;
            classicGamesList.appendChild(gameItem);
        });
    });

    // إحضار الألعاب الحديثة من Firebase
    firebase.database().ref("new").once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const game = childSnapshot.val();
            const gameItem = document.createElement("div");
            gameItem.className = "game";
            gameItem.innerHTML = <h3>${game.name}</h3><p>${game.description}</p>;
            newGamesList.appendChild(gameItem);
        });
    });
}

// استدعاء وظيفة fetchGames لعرض الألعاب عند تحميل الصفحة
window.onload = fetchGames;
