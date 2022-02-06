import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyAXhoYEnwwq8foxL9ef61uURXdSYmd6Ldc",
    authDomain: "medvisor-bf0d5.firebaseapp.com",
    projectId: "medvisor-bf0d5",
    storageBucket: "medvisor-bf0d5.appspot.com",
    messagingSenderId: "275117226253",
    appId: "1:275117226253:web:06f4cde8a9120a462b5844"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BBBds7Cnd8KRMKz0TJDqO8Y7TRTcLzeXsZQi4CcGJ14kJBiYg-1IUwtWYlSL3FfAXDLERUM4h11KZC0hTqsAXqg'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});