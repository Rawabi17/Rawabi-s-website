// عناصر النافذة المنبثقة
const popup = document.getElementById("popup");
const popupInfo = document.getElementById("popup-info");
const closeBtn = document.querySelector(".close");

// التعامل مع النقر على الصور
const images = document.querySelectorAll(".game-image");

images.forEach(image => {
    image.addEventListener("click", function() {
        // الحصول على المعلومات من السمة data-info
        const info = this.getAttribute("data-info");
        popupInfo.textContent = info;
        popup.style.display = "block";
    });
});

// إغلاق النافذة المنبثقة
closeBtn.addEventListener("click", function() {
    popup.style.display = "none";
});

// إغلاق النافذة إذا تم النقر خارجها
window.addEventListener("click", function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

// إعدادات Firebase
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

// التأكد من أن Firebase تم تحميله
console.log(firebase);

// محاولة الاتصال بقاعدة البيانات
const database = firebase.database();
database.ref('/test').set({
  testKey: 'testValue'
}).then(() => {
  console.log('Data written successfully');
}).catch((error) => {
  console.error('Error writing data:', error);
});

// معالجة إرسال النموذج
const gameForm = document.getElementById('game-form');
gameForm.addEventListener('submit', function(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // الحصول على قيم المدخلات
    const gameName = document.getElementById('game-name').value;
    const gameImage = document.getElementById('game-image').value;
    const gameDescription = document.getElementById('game-description').value;

    // إضافة اللعبة إلى Firebase
    const database = firebase.database();
    database.ref('/games').push({ // يمكنك تغيير '/games' إلى المكان الذي تريده
        name: gameName,
        image: gameImage,
        description: gameDescription
    }).then(() => {
        console.log('Game added successfully');
        // يمكنك إضافة كود لتفريغ النموذج بعد الإضافة
        gameForm.reset();
    }).catch((error) => {
        console.error('Error adding game:', error);
    });
});
