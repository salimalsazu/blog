
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCwarLgGjO1SAiEPYKhw4DlSjLUW9QTiuY",
    authDomain: "profiletask-4ef50.firebaseapp.com",
    projectId: "profiletask-4ef50",
    storageBucket: "profiletask-4ef50.appspot.com",
    messagingSenderId: "155280279523",
    appId: "1:155280279523:web:958c9291885d0afedc42d6"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);