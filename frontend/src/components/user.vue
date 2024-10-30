<template>
    <div class="user-page">
      <!-- Toggle Button for Sidebar -->
      <button class="toggle-button" @click="toggleSidebar">{{ sidebarVisible ? 'Hide Menu' : 'Show Menu' }}</button>
  
      <!-- Sidebar Navbar -->
      <nav class="sidebar" v-if="sidebarVisible">
        <h2>User Menu</h2>
        <ul>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
  
      <!-- Main Content -->
      <main class="content">
        <!-- User Info Section -->
        <section class="profile-section">
          <h1>Welcome, {{ user.name }}</h1>
          <p>Email: {{ user.email }}</p>
          <p>Member Since: {{ user.memberSince }}</p>
        </section>
  
        <!-- User Settings Section -->
        <section class="settings-section">
          <h2>Settings</h2>
          <label>
            <input type="checkbox" v-model="notifications" />
            Enable Notifications
          </label>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserPage',
    data() {
      return {
        sidebarVisible: false, // State to manage sidebar visibility
        user: {
          name: 'John Doe', // Replace with actual user data if available
          email: 'john@example.com',
          memberSince: 'January 2022',
        },
        notifications: true,
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible; // Toggle sidebar visibility
      },
    },
  };
  </script>
  
  <style scoped>
  .user-page {
    display: flex;
    height: 100vh;
    background-image: url('@/assets/schoolmunhi.png'); /* Path to the background image */
    background-size: cover;
    background-position: center;
    color: white;
  }
  
  .toggle-button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .sidebar {
    width: 200px;
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  
  .sidebar h2 {
    color: #fff;
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li a {
    color: #fff;
    text-decoration: none;
    display: block;
    margin: 10px 0;
  }
  
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-left: 200px; /* Offset for sidebar */
    background-color: rgba(0, 0, 0, 0.4); /* Optional overlay for readability */
  }
  
  .profile-section,
  .settings-section {
    background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent overlay for readability */
    padding: 20px;
    margin: 10px;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
    text-align: center;
  }
  
  h1, h2 {
    margin-bottom: 10px;
  }
  </style>
  