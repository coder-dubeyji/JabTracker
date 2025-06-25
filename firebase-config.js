// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-5Z8cYyFQ_c-W55dZ3g8Ec9domHN8IH8",
  authDomain: "jabtracker.firebaseapp.com",
  projectId: "jabtracker",
  storageBucket: "jabtracker.firebasestorage.app",
  messagingSenderId: "304478606907",
  appId: "1:304478606907:web:3422b5391820ee07c06e1e",
  measurementId: "G-1HQJGRBBTL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);