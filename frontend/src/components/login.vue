<template>
  <div id="login-page">
    <main>
      <div class="login-container">
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
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
        this.$router.push('/');
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
}

.login-container {
  background: rgba(255, 255, 255, 0.85); /* Transparent background */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.school-logo {
  width: 80px;
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

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
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
  width: 48%;
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
