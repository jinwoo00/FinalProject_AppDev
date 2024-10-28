<template>
    <div id="login-page">
      <header>
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <nav class="nav-top-right">
        </nav>
      </header>
      <main>
        <div class="login-container">
          <h2>Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
            <button type="button" class="register-button" @click="handleRegister">Register</button>
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
        // Mock login logic: You can replace this with actual authentication logic
        if (this.username === 'admin' && this.password === 'password') {
          alert('Login successful!');
          // Redirect to the front page or desired route
          this.$router.push('/');
        } else {
          this.loginError = 'Invalid username or password.';
        }
      },
      handleRegister() {
        // Redirect to the registration page
        this.$router.push('/register');
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to right, #A8FF78, #78FFD6);
    margin: 0;
    padding: 0;
  }
  
  #login-page {
    text-align: center;
  }
  
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    position: relative;
  }
  
  .school-logo {
    height: 120px;
    margin-bottom: 10px;
  }
  
  .nav-top-right {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 15px;
  }
  
  nav a {
    color: #000;
    text-decoration: none;
    font-weight: bold;
  }
  
  .login-container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
    margin-top: 50px;
  }
  
  h2 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button[type="submit"] {
    background: linear-gradient(to right, #78FFD6, #A8FF78);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .register-button {
    background: linear-gradient(to right, #78FFD6, #A8FF78);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  button[type="submit"]:hover, .register-button:hover {
    background: linear-gradient(to right, #A8FF78, #78FFD6);
  }
  
  .error-message {
    color: red;
    margin-top: 15px;
  }
  </style>
  