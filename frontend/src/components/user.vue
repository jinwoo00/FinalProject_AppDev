<template>
  <div class="user-page">
    <!-- Toggle Button for Sidebar (Hamburger Icon) -->
    <button v-if="!sidebarVisible" class="toggle-button" @click="toggleSidebar">
      <span class="hamburger-icon"></span>
    </button>

    <!-- Sidebar Navbar -->
    <nav :class="['sidebar', { visible: sidebarVisible }]">
      <h2>User Menu</h2>
      <ul>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Logout</a></li>
        <li><button class="hide-button" @click="toggleSidebar">Hide Menu</button></li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main :class="['content', { 'content-shift': sidebarVisible }]">
      <section class="profile-section">
        <h1>Welcome, {{ user.name }}</h1>
        <p>Email: {{ user.email }}</p>
        <p>Member Since: {{ user.memberSince }}</p>
      </section>

      <section class="settings-section">
        <h2>Settings</h2>
        <label>
          <input type="checkbox" v-model="notifications" />
          Enable Notifications
        </label>
      </section>
    </main>

    <!-- Logo Image -->
    <img src="@/assets/munhi_logo.png" alt="Logo" class="logo" />
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      sidebarVisible: false,
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        memberSince: 'January 2022',
      },
      notifications: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>

<style scoped>
.user-page {
  display: flex;
  height: 100vh;
  background-color: rgb(200, 194, 194);
  color: black;
  position: relative;
}

.user-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Slight overlay to make the background less prominent */
  z-index: -1;
}

.toggle-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.hamburger-icon {
  width: 25px;
  height: 3px;
  background-color: black;
  position: relative;
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  width: 25px;
  height: 3px;
  background-color: black;
  position: absolute;
  left: 0;
}

.hamburger-icon::before {
  top: -8px;
}

.hamburger-icon::after {
  top: 8px;
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  color: black;
}

.sidebar.visible {
  transform: translateX(0);
}

.sidebar h2 {
  color: black;
  font-size: 18px;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  color: black;
  text-decoration: none;
}

.hide-button {
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
  transition: margin-left 0.3s ease;
}

.content-shift {
  margin-left: 200px;
}

.profile-section,
.settings-section {
  background-color: #8d8b8b;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  margin-bottom: 10px;
}

/* Logo styles */
.logo {
  position: absolute;
  top: 20px; /* Adjust as necessary */
  right: 20px; /* Adjust as necessary */
  width: 100px; /* Set an appropriate size */
  height: auto; /* Maintain aspect ratio */
}
</style>
