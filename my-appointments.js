import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const appointmentsList = document.getElementById("appointments-list");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const q = query(
      collection(db, "appointments"),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    appointmentsList.innerHTML = ""; // clear loading message

    if (querySnapshot.empty) {
      appointmentsList.innerHTML = "<p>No appointments found.</p>";
    } else {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const div = document.createElement("div");
        div.className = "appointment";
        div.innerHTML = `
          <strong>Child Name:</strong> ${data.childName}<br>
          <strong>Vaccine:</strong> ${data.vaccineName}<br>
          <strong>Date:</strong> ${data.appointmentDate}<br>
          <strong>Location:</strong> ${data.location}<br>
          <strong>Status:</strong> ${data.status}
        `;
        appointmentsList.appendChild(div);
      });
    }

  } catch (error) {
    console.error("Error fetching appointments:", error);
    appointmentsList.innerHTML = "<p>Error loading appointments.</p>";
  }
});
