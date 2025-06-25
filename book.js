import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Wait for Firebase Auth to confirm the user
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirect to login if not logged in
    window.location.href = "login.html";
  } else {
    // Listen for form submit
    document.getElementById("booking-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const childName = document.getElementById("name").value;
      const vaccineName = document.getElementById("vaccine").value;
      const appointmentDate = document.getElementById("date").value;
      const location = document.getElementById("location").value;

      try {
        await addDoc(collection(db, "appointments"), {
          userId: user.uid,
          childName: childName,
          vaccineName: vaccineName,
          appointmentDate: appointmentDate,
          location: location,
          status: "pending"
        });
        window.location.href = "my-appointments.html";

        document.getElementById("booking-msg").textContent = "Appointment booked successfully!";
        document.getElementById("booking-form").reset();
      } catch (error) {
        console.error("Error booking:", error);
        document.getElementById("booking-msg").textContent = "Failed to book appointment.";
      }
    });
  }
});
