// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAXhoYEnwwq8foxL9ef61uURXdSYmd6Ldc",
    authDomain: "medvisor-bf0d5.firebaseapp.com",
    projectId: "medvisor-bf0d5",
    storageBucket: "medvisor-bf0d5.appspot.com",
    messagingSenderId: "275117226253",
    appId: "1:275117226253:web:06f4cde8a9120a462b5844"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);

});