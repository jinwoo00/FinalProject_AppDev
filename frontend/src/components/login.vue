<template>
  <div id="login-page">
    <main>
      <div class="login-container">
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input type="text" id="email" v-model="email" placeholder="Email" required />
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password" v-model="password" placeholder="Password" required />
            </div>
          </div>
          <div class="button-group">
            <button type="submit" class="login-button">Login</button>
            <button type="button" class="register-button" @click="handleRegister">Register</button>
          </div>
        </form>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
        <button @click="showResetPasswordModal" class="reset-password-button">Forgot Password?</button>
      </div>

      <!-- Reset Password Modal -->
      <div v-if="showResetModal" class="reset-modal">
        <div class="modal-content">
          <span class="close" @click="showResetModal = false">&times;</span>
          <h3>Reset Password</h3>
          <input
            type="email"
            v-model="resetEmail"
            class="form-control mb-2"
            placeholder="Enter your email"
          />
          <button @click="resetPassword" class="btn btn-primary">Send Reset Email</button>
          <p v-if="resetMessage" class="message">{{ resetMessage }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { auth, db } from '../firebaseConfig'; // Removed 'db' since it's not used
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      loginError: null,
      showResetModal: false, // Controls visibility of the reset password modal
      resetEmail: '', // Email input for reset
      resetMessage: null, // Message for reset feedback
    };
  },
  methods: {
    async handleLogin() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Check if email is verified
        if (!user.emailVerified) {
          this.loginError = 'Please verify your email before logging in.';
          return;
        }

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid)); // Make sure 'db' is used correctly or remove this line if unnecessary
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'admin') {
            this.$router.push('/adminDashboard');
          } else {
            this.$router.push('/user');
          }
        } else {
          this.loginError = 'User data not found. Please contact support.';
        }
      } catch (error) {
        this.loginError = error.message || 'Invalid email or password.';
      }
    },
    handleRegister() {
      this.$router.push('/register');
    },
    showResetPasswordModal() {
      this.showResetModal = true; // Open the reset password modal
    },
    async resetPassword() {
      if (!this.resetEmail) {
        this.resetMessage = 'Please enter your email.';
        return;
      }

      try {
        await sendPasswordResetEmail(auth, this.resetEmail);
        this.resetMessage = 'A password reset email has been sent. Please check your inbox.';
      } catch (error) {
        this.resetMessage = error.message || 'Failed to send reset email.';
      }
    },
  },
};
</script>

<style scoped>
#login-page {
  background-image: url('@/assets/schoolmunhi.png'); /* Corrected path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
}

.login-container {
  background: rgba(255, 255, 255, 0.85); /* Transparent background */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 350px; /* Constrain maximum width */
  text-align: center;
}

.school-logo {
  width: 130px; /* Reduced logo size to fit better */
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
}

.input-icon {
  position: relative;
  width: 100%; /* Make sure input-icon takes full width */
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #aaa;
}

.input-icon input {
  width: 100%;
  padding: 10px 10px 10px 60px; /* Padding for icon space */
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
  box-sizing: border-box; /* Prevents padding from affecting width */
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.login-button,
.register-button {
  background: #28a745;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 48%; /* Ensures buttons fit side by side */
}

.login-button:hover,
.register-button:hover {
  background: #218838;
}

.reset-password-button {
  margin-top: 15px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.reset-password-button:hover {
  color: #0056b3;
}

.reset-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.message {
  margin-top: 10px;
  color: green;
}
</style>