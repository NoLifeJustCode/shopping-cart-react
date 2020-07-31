import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAj7lOqMZK_DeduMTenFc-TYHBSEIBK_bs",
    authDomain: "cart-46bc2.firebaseapp.com",
    databaseURL: "https://cart-46bc2.firebaseio.com",
    projectId: "cart-46bc2",
    storageBucket: "cart-46bc2.appspot.com",
    messagingSenderId: "784679909553",
    appId: "1:784679909553:web:743c25f444a4fd5f0bca90"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));
