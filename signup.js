import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save name and DOB in Firestore under 'users' collection
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      dob: dob,
      email: email
    });

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  } catch (error) {
    document.getElementById("signup-error").textContent = error.message;
  }
});
