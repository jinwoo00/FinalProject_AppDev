<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <!-- Left-aligned logo and name -->
      <div class="navbar-brand-container">
        <a class="navbar-brand" href="/user">
          <img src="@/assets/munhi_logo.png" alt="School Logo" class="d-inline-block align-text-center logo-img">
          <span class="school-name">NAUJAN MUNICIPAL HIGH-SCHOOL</span>
        </a>
      </div>
      <button
        class="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
        <!-- Navbar options aligned to the right -->
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li>
          <!-- Appointments Dropdown Menu -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="appointmentsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Appointments
            </a>
            <ul class="dropdown-menu" aria-labelledby="appointmentsDropdown">
              <!-- Use 'router-link' to navigate to the CounselingApp route -->
              <li><router-link to="/CounselingApp" class="dropdown-item">Schedule Counseling</router-link></li>
              <li><a class="dropdown-item" href="/counseling-history">View Counseling History</a></li>
              <li><a class="dropdown-item" href="/book-session">Book a Session</a></li>
            </ul>
          </li>
          <!-- Mood Tracker Dropdown Menu -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="moodDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mood Tracker
            </a>
            <ul class="dropdown-menu" aria-labelledby="moodDropdown">
              <li><a class="dropdown-item" href="#">Log Mood</a></li>
              <li><a class="dropdown-item" href="#">View Mood Analytics</a></li>
              <li><a class="dropdown-item" href="#">Mood Journal</a></li>
            </ul>
          </li>
          <!-- Other Dropdowns and Links -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="chatbotDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Chatbot
            </a>
            <ul class="dropdown-menu" aria-labelledby="chatbotDropdown">
              <li><a class="dropdown-item" href="#">Chat Now</a></li>
              <li><a class="dropdown-item" href="#">FAQs</a></li>
              <li><a class="dropdown-item" href="#">Mental Health Tips</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="settingsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </a>
            <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
              <li><a class="dropdown-item" href="#">User Settings</a></li>
              <li><a class="dropdown-item" href="#">Notifications</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Privacy Settings</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="feedbackDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Feedback
            </a>
            <ul class="dropdown-menu" aria-labelledby="feedbackDropdown">
              <li><a class="dropdown-item" href="#">Submit Feedback</a></li>
              <li><a class="dropdown-item" href="#">View Feedback History</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="helpDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Help & Support
            </a>
            <ul class="dropdown-menu" aria-labelledby="helpDropdown">
              <li><a class="dropdown-item" href="#">FAQ</a></li>
              <li><a class="dropdown-item" href="#">Contact Support</a></li>
              <li><a class="dropdown-item" href="#">User Guide</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="confirmLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '../firebaseConfig'; // Adjust path as necessary

export default {
  name: 'AppNavbar',
  methods: {
    async confirmLogout() {
      // Show a confirmation dialog before logging out
      const userConfirmed = window.confirm('Are you sure you want to logout?');
      if (userConfirmed) {
        await this.handleLogout();
      }
    },
    async handleLogout() {
      try {
        await auth.signOut(); // Ensure 'auth' is properly imported from your firebase config
        this.$router.push('/login'); // Adjust the route as necessary
        alert('You have been logged out successfully.');
      } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred while logging out. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
/* Navbar styling */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 15px; /* Adjust padding for a balanced look */
}

.navbar-brand-container {
  display: flex;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 40px; /* Adjust size to fit well */
  height: auto;
  margin-right: 10px;
}

.school-name {
  font-size: 18px; /* Adjust for better size on smaller screens */
  font-weight: bold;
}

.navbar-toggler {
  border: none; /* Remove border if desired */
  padding: 8px 10px;
}

.navbar-toggler-icon {
  width: 24px; /* Adjust for better size */
  height: 24px; /* Adjust for better size */
}

@media (max-width: 768px) {
  .navbar-brand-container {
    flex-grow: 1;
    justify-content: space-between; /* Spread logo and toggler icon */
  }
  .school-name {
    font-size: 16px; /* Smaller font size on mobile */
  }
}
</style>
