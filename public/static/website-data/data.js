export const user = {
    name: '小王',
    avatar: 'avatar.jpg',
    email: 'xw2114@xxx.edu',
    phone: '646-xxx-3446',
    github: 'https://github.com/xxx',
};

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


const firebase = `<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCwQvqONiFfMO1zc_w8AFcJTBst4Fe11Go",
    authDomain: "personal-blog-firebase-project.firebaseapp.com",
    databaseURL: "https://personal-blog-firebase-project.firebaseio.com",
    projectId: "personal-blog-firebase-project",
    storageBucket: "personal-blog-firebase-project.appspot.com",
    messagingSenderId: "769955753732",
    appId: "1:769955753732:web:8546d8005c70c8955aaa51",
    measurementId: "G-KFYCF08XG3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>`;
