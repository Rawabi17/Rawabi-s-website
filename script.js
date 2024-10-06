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

        // عرض النافذة المنبثقة
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

images.forEach(image => {
    image.addEventListener("click", function() {
        const info = this.getAttribute("data-info");
        console.log(info); // تأكد من أن هذه السطر يظهر المعلومات الصحيحة في Console
        popupInfo.textContent = info;
        popup.style.display = "block";
    });
});

document.querySelectorAll('.game-image').forEach(image => {
    image.addEventListener('click', () => {
        let info = image.getAttribute('data-info');
        alert(info); // أو يمكنك عرض المعلومات في نافذة منبثقة أو تحت الصورة
    });
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
