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
        <label class="notification-toggle">
          <input type="checkbox" v-model="notifications" />
          <span>Enable Notifications</span>
        </label>
      </section>
    </main>

    <!-- Import and Use Footer Component -->
    <AppFooter />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'UserPage',
  components: {
    Navbar,
    AppFooter,
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
/* Page Layout */
.user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb; /* Light background */
  color: #333; /* Dark text color for readability */
}

/* Main Content */
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

/* Profile Section */
.profile-section {
  background-color: #ffffff; /* White card */
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  max-width: 500px;
  text-align: center;
  margin-bottom: 30px;
}

.profile-section h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #26df26; /* Primary color */
}

.profile-section p {
  font-size: 1em;
  color: #555; /* Gray text for secondary information */
}

/* Settings Section */
.settings-section {
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  text-align: center;
}

.settings-section h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
}

/* Notification Toggle */
.notification-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: #333;
}

.notification-toggle input[type='checkbox'] {
  margin-right: 10px;
  transform: scale(1.2); /* Slightly larger checkbox */
}

/* Footer */
footer {
  padding: 15px;
  background-color: #006727;
  color: #000000;
  text-align: center;
  font-size: 0.9em;
}
</style>
