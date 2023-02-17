// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA26FdJWg9uHZXEo-12VidTdpAzqtOqzEM",
  authDomain: "eka-bienes-raices.firebaseapp.com",
  projectId: "eka-bienes-raices",
  storageBucket: "eka-bienes-raices.appspot.com",
  messagingSenderId: "1085739121193",
  appId: "1:1085739121193:web:ddebcadabd83877dde3a38",
  measurementId: "G-5BFQ5Q1J56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseDataBase = () => {
  useEffect(() => {
    fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(data.posts.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return <div></div>;
};
