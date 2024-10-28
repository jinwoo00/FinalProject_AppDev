
  <template>
    <div id="register-page">
      <header>
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <nav class="nav-top-right">
         
        </nav>
      </header>
      <main>
        <div class="register-container">
          <h2>Register</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" v-model="confirmPassword" required />
            </div>
            <button type="submit">Register</button>
          </form>
          <p v-if="registerError" class="error-message">{{ registerError }}</p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        registerError: null,
      };
    },
    methods: {
      handleRegister() {
        if (this.password !== this.confirmPassword) {
          this.registerError = 'Passwords do not match.';
        } else {
          alert('Registration successful!');
          // Redirect to the login page or desired route
          this.$router.push('/Login');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
    margin-top: 50px;
    text-align: left;
  }

  #register-page {
    text-align: center;
  }

  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
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
  }

  button[type="submit"]:hover {
    background: linear-gradient(to right, #A8FF78, #78FFD6);
  }

  .error-message {
    color: red;
    margin-top: 15px;
  }
  </style>
