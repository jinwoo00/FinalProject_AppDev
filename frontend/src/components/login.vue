<template>
  <div id="login-page">
    <main>
      <div class="login-container">
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <h2 class="welcome-text">Welcome Back!</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input type="text" id="email" v-model="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
            </div>
          </div>
          <div class="button-group">
            <button type="submit" class="login-button">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button type="button" class="register-button" @click="handleRegister">
              <i class="fas fa-user-plus"></i> Register
            </button>
          </div>
        </form>
        <p v-if="loginError" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ loginError }}
        </p>
        <button @click="showResetPasswordModal" class="reset-password-button">
          <i class="fas fa-key"></i> Forgot Password?
        </button>
      </div>

      <!-- Reset Password Modal -->
      <div v-if="showResetModal" class="reset-modal">
        <div class="modal-content">
          <span class="close" @click="showResetModal = false">&times;</span>
          <h3>Reset Password</h3>
          <p class="modal-description">Enter your email address to reset your password.</p>
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              v-model="resetEmail"
              class="form-control mb-2"
              placeholder="Enter your email"
            />
          </div>
          <button @click="resetPassword" class="btn btn-primary">
            <i class="fas fa-paper-plane"></i> Send Reset Email
          </button>
          <p v-if="resetMessage" class="message">
            <i class="fas fa-check-circle"></i> {{ resetMessage }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      loginError: null,
      showResetModal: false,
      resetEmail: '',
      resetMessage: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          this.loginError = 'Please verify your email before logging in.';
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'admin') {
            this.$router.push('/adminDashboard');
          } else {
            this.$router.push('/students');
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
      this.showResetModal = true;
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
:root {
  --color-dark: #1A1A19;
  --color-forest: #31511E;
  --color-olive: #859F3D;
  --color-cream: #F6FCDF;
  --shadow-sm: 0 2px 4px rgba(26, 26, 25, 0.1);
  --shadow-md: 0 4px 6px rgba(26, 26, 25, 0.1);
  --shadow-lg: 0 10px 15px rgba(26, 26, 25, 0.1);
  --transition: all 0.3s ease;
}

#login-page {
  min-height: 100vh;
  background-image: url('C:\Users\keith\OneDrive\Documents\GitHub\FinalProject_AppDev\frontend\src\assets\schoolmunhi.png');
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background-size: cover;
}



#login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: blur(1px);
  animation: gradientAnimation 15s ease infinite;
  z-index: -1;
}

main {
  width: 100%;
  max-width: 400px;
}

.login-container {
  background-color:#ffffffc3;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.school-logo {
  display: block;
  width: 120px;
  height: auto;
  margin: 0 auto 1.5rem;
  transition: var(--transition);
}

.school-logo:hover {
  transform: scale(1.05) rotate(5deg);
}

.welcome-text {
  color: #004f27;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #004f27;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: var(--color-olive);
  transition: var(--transition);
}

.input-icon input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid var(--color-olive);
  border-radius: 10px;
  font-size: 1rem;
  transition: var(--transition);
  background-color: rgba(255, 255, 255, 0.9);
}

.input-icon input:focus {
  outline: none;
  border-color: var(--color-forest);
  box-shadow: 0 0 0 3px rgba(49, 81, 30, 0.2);
}

.input-icon input:focus + i {
  color: var(--color-forest);
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.login-button,
.register-button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-button {
  background-color:  #3e5630;
  color: white  ;
}

.register-button {
  background-color: #3e5630;
  color: white;
}

.login-button:hover,
.register-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.login-button:hover {
  background-color: #77bf4a;
}

.register-button:hover {
  background-color: #77bf4a;
}

.login-button i,
.register-button i {
  margin-right: 0.5rem;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message i {
  margin-right: 0.5rem;
}

.reset-password-button {
  background: none;
  border: none;
  color: var(--color-forest);
  font-size: 0.9rem;
  margin: 1rem auto 0;
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
  width: 100%;
}

.reset-password-button:hover {
  color: var(--color-olive);
  text-decoration: underline;
}

.reset-password-button i {
  margin-right: 0.5rem;
}

.reset-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 25, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: var(--color-cream);
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  position: relative;
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content h3 {
  color: var(--color-forest);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-description {
  color: var(--color-dark);
  margin-bottom: 1rem;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: var(--color-forest);
  cursor: pointer;
  transition: var(--transition);
}

.close:hover {
  color: var(--color-olive);
}

.btn-primary {
  background-color: var(--color-forest);
  color: var(--color-cream);
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}

.btn-primary:hover {
  background-color: #2a4619;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.btn-primary i {
  margin-right: 0.5rem;
}

.message {
  color: #28a745;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message i {
  margin-right: 0.5rem;
}

@media (max-width: 480px) {
  .login-container {
    padding: 2rem;
  }

  .button-group {
    grid-template-columns: 1fr;
  }

  .welcome-text {
    font-size: 1.75rem;
  }
}
</style>

