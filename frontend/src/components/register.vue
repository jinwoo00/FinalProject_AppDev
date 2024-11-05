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
            <label for="Password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group">
            <label for="Confirm Password">Confirm Password:</label>
            <input type="password" id="confirmpassword" v-model="confirmpassword" required />
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
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default {
  name: 'RegisterPage',
  data() {
    return {
      firstname: '',
      middlename: '',
      lastname: '',
      gender: '',
      email: '',
      studentID: '',
      section: '',
      password: '',
      confirmpassword: '',
      registerError: null,
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmpassword) {
        this.registerError = 'Passwords do not match.';
        return;
      }

      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);

        // Store additional user information in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          firstname: this.firstname,
          middlename: this.middlename,
          lastname: this.lastname,
          gender: this.gender,
          email: this.email,
          studentID: this.studentID,
          section: this.section,
          verified: false,  // Track verification status
          role: 'admin' // Mag-set ng role bilang admin
        });

        alert('Registration successful! Please check your email to verify your account.');
        this.$router.push('/Login');
      } catch (error) {
        this.registerError = error.message || 'An error occurred during registration.';
      }
    },
  },
};
</script>

<style scoped>
/* Your CSS remains the same */
</style>
