<template>
  <div class="user-page">
    <Navbar />

    <main class="content">
      <section class="profile-section">
        <h1>Welcome, {{ student.firstName }} {{ student.lastName }}</h1>
        <p>Email: {{ student.email }}</p>
        <p>Member Since: {{ formatDate(student.memberSince) }}</p>
      </section>

      <section class="settings-section">
        <h2>Settings</h2>
        <label class="notification-toggle">
          <input type="checkbox" v-model="notifications" @change="updateNotificationSettings" />
          <span>Enable Notifications</span>
        </label>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  name: 'StudentDashboard',
  components: {
    Navbar,
    AppFooter,
  },
  setup() {
    const auth = getAuth();
    const db = getFirestore();

    const student = ref({
      firstName: '',
      lastName: '',
      email: '',
      memberSince: null,
    });
    const notifications = ref(false);

    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await fetchStudentData(user.uid);
        } else {
          // Handle unauthenticated state
          console.log('User is not authenticated');
        }
      });
    });

    const fetchStudentData = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          student.value = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            memberSince: userData.memberSince,
          };
          notifications.value = userData.notifications || false;
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const updateNotificationSettings = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          await updateDoc(doc(db, 'users', user.uid), {
            notifications: notifications.value
          });
          console.log('Notification settings updated');
        }
      } catch (error) {
        console.error('Error updating notification settings:', error);
      }
    };

    const formatDate = (date) => {
      if (!date) return 'N/A';
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return {
      student,
      notifications,
      updateNotificationSettings,
      formatDate,
    };
  },
};
</script>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  color: #333;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.profile-section, .settings-section {
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.profile-section h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #26df26;
}

.profile-section p {
  font-size: 1em;
  color: #555;
}

.settings-section h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
}

.notification-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: #333;
}

.notification-toggle input[type='checkbox'] {
  margin-right: 10px;
  transform: scale(1.2);
}
</style>