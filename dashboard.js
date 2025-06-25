import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = 'login.html';
});
