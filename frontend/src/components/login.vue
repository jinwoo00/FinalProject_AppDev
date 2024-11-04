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
              <input type="text" id="email" v-model="username" placeholder="Email" required />
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
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      loginError: null,
    };
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === 'password') {
        alert('Login successful!');
        this.$router.push('/admin');
      } else {
        this.loginError = 'Invalid username or password.';
      }
    },
    handleRegister() {
      this.$router.push('/register');
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
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 350px; /* Constrain maximum width */
  text-align: center;
}

.school-logo {
  width: 60px; /* Reduced logo size to fit better */
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
  padding: 10px 10px 10px 35px; /* Padding for icon space */
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

.error-message {
  color: red;
  margin-top: 15px;
}
</style>
