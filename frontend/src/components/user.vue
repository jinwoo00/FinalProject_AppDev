<template>
  <div class="user-page">
    <!-- Import and Use Navbar Component -->
    <Navbar />

    <!-- Main Content -->
    <main class="content">
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

    <!-- Import and Use Footer Component -->
    <AppFooter />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'; // Adjust the path to your Navbar component
import AppFooter from '@/components/Footer.vue'; // Import the Footer component

export default {
  name: 'UserPage',
  components: {
    Navbar, // Register the Navbar component
    AppFooter, // Register the Footer component
  },
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        memberSince: 'January 2022',
      },
      notifications: true,
    };
  },
};
</script>

<style scoped>
/* Main content styling */
.user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(200, 194, 194);
  color: black;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
}
</style>
