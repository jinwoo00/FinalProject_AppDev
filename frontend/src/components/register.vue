<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <!-- Left-aligned logo and name -->
      <div class="navbar-brand-container">
        <a class="navbar-brand" href="/user">
          <img src="@/assets/munhi_logo.png" alt="School Logo" class="d-inline-block align-text-center logo-img">
          <span class="school-name">NAUJAN MUNICIPAL HIGH-SCHOOL</span>
        </a>
      </div>
      <!-- Right-aligned register button -->
      <div class="d-flex ms-auto">
        <button @click="handleRegisterClick" class="btn btn-primary">Register</button>
      </div>
    </div>
  </nav>
  <div id="register-page" class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-4 w-100" style="max-width: 900px; display: flex; border-radius: 15px;">
      <div class="row">
        <!-- General Information -->
        <div class="col-md-6 bg-white p-4" style="border-radius: 15px 0 0 15px;">
          <h5 class="text-primary">General Information</h5>
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="student-name" class="form-label">Student Name:</label>
              <div class="row g-2">
                <div class="col-4">
                  <input type="text" id="firstname" placeholder="First name" v-model="firstname" class="form-control" required />
                  <small v-if="showWarnings && !firstname" class="text-danger">required.</small>
                </div>
                <div class="col-4">
                  <input type="text" id="middlename" placeholder="Middle name" v-model="middlename" class="form-control" />
                  <!-- Middle name is optional; no required attribute -->
                </div>
                <div class="col-4">
                  <input type="text" id="lastname" placeholder="Last name" v-model="lastname" class="form-control" required />
                  <small v-if="showWarnings && !lastname" class="text-danger">required.</small>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="dob" class="form-label">Date of Birth:</label>
              <input type="date" id="dob" v-model="dob" class="form-control" required />
              <small v-if="showWarnings && !dob" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="gender" class="form-label">Gender:</label>
              <select id="gender" v-model="gender" class="form-select" required>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <small v-if="showWarnings && !gender" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">E-mail:</label>
              <input type="email" id="email" v-model="email" class="form-control" required />
              <small v-if="showWarnings && !email" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="student-id" class="form-label">ID No.:</label>
              <input type="text" id="student-id" v-model="studentID" class="form-control" required />
              <small v-if="showWarnings && !studentID" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="section" class="form-label">List of Section:</label>
              <select id="section" v-model="section" class="form-select" required>
                <option value="" disabled>Select Section</option>
                <option value="section1">Section 1</option>
                <option value="section2">Section 2</option>
              </select>
              <small v-if="showWarnings && !section" class="text-danger">required.</small>
            </div>
          </form>
        </div>
        
        <!-- Contact Details -->
        <div class="col-md-6 bg-primary text-white p-4" style="border-radius: 0 15px 15px 0;">
          <h5>Contact Details</h5>
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="contact" class="form-label">Contact Number:</label>
              <input type="tel" id="contact" v-model="contact" class="form-control" required />
              <small v-if="showWarnings && !contact" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address:</label>
              <input type="text" id="address" v-model="address" class="form-control" required />
              <small v-if="showWarnings && !address" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="guardian-name" class="form-label">Guardian's Name:</label>
              <input type="text" id="guardian-name" v-model="guardianName" class="form-control" required />
              <small v-if="showWarnings && !guardianName" class="text-danger">required.</small>
            </div>
            <div class="mb-3">
              <label for="guardian-contact" class="form-label">Guardian's Contact Number:</label>
              <input type="tel" id="guardian-contact" v-model="guardianContact" class="form-control" required />
              <small v-if="showWarnings && !guardianContact" class="text-danger">required.</small>
            </div>
            
            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input type="password" id="password" v-model="password" class="form-control" required />
              <small v-if="showWarnings && !password" class="text-danger">Password is required.</small>
            </div>
            <div class="mb-3">
              <label for="confirmpassword" class="form-label">Confirm Password:</label>
              <input type="password" id="confirmpassword" v-model="confirmpassword" class="form-control" required />
              <small v-if="showWarnings && password !== confirmpassword" class="text-danger">Passwords do not match.</small>
            </div>
          </form>
        </div>
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
      middlename: '', // New field added
      lastname: '',
      dob: '',
      gender: '',
      email: '',
      contact: '',
      address: '',
      studentID: '',
      guardianName: '',
      guardianContact: '',
      section: '',
      password: '',
      confirmpassword: '',
      registerError: null,
      showWarnings: false,
    };
  },
  methods: {
    async handleRegister() {
      if (!this.validateForm()) {
        this.showWarnings = true;
        return;
      }

      if (this.password !== this.confirmpassword) {
        this.registerError = 'Passwords do not match.';
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        await sendEmailVerification(user);

        await setDoc(doc(db, 'users', user.uid), {
          firstname: this.firstname,
          middlename: this.middlename, // Save middlename
          lastname: this.lastname,
          dob: this.dob,
          gender: this.gender,
          email: this.email,
          contact: this.contact,
          address: this.address,
          studentID: this.studentID,
          guardianName: this.guardianName,
          guardianContact: this.guardianContact,
          section: this.section,
          verified: false,
        });

        alert('Registration successful! Please check your email to verify your account.');
        this.$router.push('/Login');
      } catch (error) {
        this.registerError = error.message || 'An error occurred during registration.';
      }
    },
    handleRegisterClick() {
      this.handleRegister(); // Trigger the register logic when clicking the button in the navbar
    },
    validateForm() {
      return (
        this.firstname &&
        this.lastname &&
        this.dob &&
        this.gender &&
        this.email &&
        this.contact &&
        this.address &&
        this.studentID &&
        this.guardianName &&
        this.guardianContact &&
        this.section &&
        this.password &&
        this.confirmpassword
      );
    },
  },
};
</script>



<style scoped>
#register-page {
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.card {
  display: flex;
  border-radius: 15px;
  overflow: hidden;
}
.form-label {
  font-weight: 600;
}

button {
  margin-top: 10px;
}
body, html {
  margin: 0;
  padding: 0;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
}

.navbar-brand-container {
  display: flex;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 40px;
  height: auto;
  margin-right: 10px;
}

.school-name {
  font-size: 18px;
  font-weight: bold;
}

.navbar-toggler {
  border: none;
  padding: 8px 10px;
}

.navbar-toggler-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .navbar-brand-container {
    flex-grow: 1;
    justify-content: space-between;
  }
  .school-name {
    font-size: 16px;
  }
}
</style>
