<template>
  <div id="register-page">
    <div class="overlay">
      <div class="register-container">
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="student-name">Student Name:</label>
            <div class="name-inputs">
              <input type="text" id="firstname" placeholder="Firstname" v-model="firstname" required />
              <input type="text" id="middlename" placeholder="Middlename" v-model="middlename" />
              <input type="text" id="lastname" placeholder="Lastname" v-model="lastname" required />
            </div>
          </div>
          <div class="form-group">
            <label for="gender">Gender:</label>
            <select id="gender" v-model="gender" required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="student-id">ID No.:</label>
            <input type="text" id="student-id" v-model="studentID" required />
          </div>
          <div class="form-group">
            <label for="section">List of Section:</label>
            <select id="section" v-model="section" required>
              <option value="" disabled>Select Section</option>
              <option value="section1">Section 1</option>
              <option value="section2">Section 2</option>
              <!-- Add more sections as needed -->
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        <p class="back-link" @click="$router.push('/Login')">← Back to Login</p>
        <p v-if="registerError" class="error-message">{{ registerError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      firstname: '',
      middlename: '',  // New data property for Middle Name
      lastname: '',
      gender: '',
      email: '',
      studentID: '',
      section: '',
      registerError: null,
    };
  },
  methods: {
    handleRegister() {
      if (!this.firstname || !this.lastname || !this.gender || !this.email || !this.studentID || !this.section) {
        this.registerError = 'Please fill out all fields.';
      } else {
        alert('Registration successful!');
        this.$router.push('/Login');
      }
    },
  },
};
</script>

<style scoped>
#register-page {
  background-image: url('@/assets/schoolmunhi.png'); /* Update this path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
}

.overlay {
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.register-container {
  background: rgba(255, 255, 255, 0.9); /* Light form background */
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  max-height: calc(100vh - 40px); /* Ensure the container fits in the viewport */
  overflow: auto; /* Enable scrolling only if necessary */
}

.school-logo {
  width: 80px;
  margin-bottom: 20px;
  display: block; /* Center logo */
  margin-left: auto;
  margin-right: auto;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.name-inputs {
  display: flex; /* Align inputs horizontally */
  justify-content: space-between;
}

.name-inputs input {
  width: 30%; /* Adjust width for each input */
  margin-right: 2%; /* Space between inputs */
}

.name-inputs input:last-child {
  margin-right: 0; /* Remove right margin from the last input */
}

input[type="text"],
input[type="email"],
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

button[type="submit"] {
  background: #28a745;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
}

button[type="submit"]:hover {
  background: #218838;
}

.back-link {
  color: #007bff;
  margin-top: 10px;
  cursor: pointer;
  display: inline-block;
}

.back-link:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-top: 15px;
}
</style>
