import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDAFY2_xg6IQAqNqSvjp9b3sVl61hS4ghY",
  authDomain: "super-chat-ufabc.firebaseapp.com",
  projectId: "super-chat-ufabc",
  storageBucket: "super-chat-ufabc.appspot.com",
  messagingSenderId: "692356494863",
  appId: "1:692356494863:web:7a8e58cde7eda7d431557a"
};

firebase.initializeApp(firebaseConfig)

export default firebase;