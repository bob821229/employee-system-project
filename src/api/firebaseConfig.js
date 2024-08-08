import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBRGYWEvWWUK85aIsl0AZnrPXVJz320QuU",
    authDomain: "employeesystemproject.firebaseapp.com",
    databaseURL: "https://employeesystemproject-default-rtdb.firebaseio.com",
    projectId: "employeesystemproject",
    storageBucket: "employeesystemproject.appspot.com",
    messagingSenderId: "608429976922",
    appId: "1:608429976922:web:3fd6b682331174bce35763"
  };
  

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 取得 Firestore 資料庫實例
const db = getDatabase(app);
// 取得 Storage 實例
// const storage = getStorage(app, "gs://employeesystemproject.appspot.com")
const storage = getStorage(app);

export { db , storage };
