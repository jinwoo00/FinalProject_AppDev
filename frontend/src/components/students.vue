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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');



.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
}

.content::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  animation: rotate 20s linear infinite;
  z-index: 0;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile-section, .settings-section {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  max-width: 550px;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}

.profile-section:hover, .settings-section:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.profile-section h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #31511e;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.profile-section p {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.profile-section p:hover {
  color: #31511e;
  transform: translateX(5px);
}

.settings-section h2 {
  font-size: 2em;
  margin-bottom: 25px;
  color: #31511e;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.settings-section h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #31511e, #859f3d);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.settings-section:hover h2::after {
  transform: scaleX(1);
}

.notification-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #333;
  transition: all 0.3s ease;
}

.notification-toggle:hover {
  color: #31511e;
}

.notification-toggle input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  width: 50px;
  height: 26px;
  background-color: #e0e0e0;
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.3s ease;
}

.notification-toggle input[type='checkbox']::before {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.notification-toggle input[type='checkbox']:checked {
  background-color: #859f3d;
}

.notification-toggle input[type='checkbox']:checked::before {
  transform: translateX(24px);
}

.notification-toggle span {
  font-weight: 500;
}

@media (max-width: 600px) {
  .content {
    padding: 40px 15px;
  }

  .profile-section, .settings-section {
    padding: 30px;
  }

  .profile-section h1 {
    font-size: 2em;
  }

  .settings-section h2 {
    font-size: 1.7em;
  }

  .notification-toggle {
    font-size: 1.1em;
  }
}
</style>