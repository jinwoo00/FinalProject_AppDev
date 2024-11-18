<template>
  <div class="register-page">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="@/assets/munhi_logo.png" alt="School Logo" class="logo-img">
          <span class="school-name">NAUJAN MUNICIPAL HIGH-SCHOOL</span>
        </div>
        <button @click="handleRegisterClick" class="btn-register">Register</button>
      </div>
    </nav>
    <div class="register-form-container">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Student Registration</h2>
          <form @submit.prevent="handleRegister">
            <!-- General Information -->
            <div class="form-section">
              <h3>General Information</h3>
              <div class="form-group">
                <label for="student-name">Student Name:</label>
                <div class="name-inputs">
                  <input type="text" id="firstname" v-model="firstname" placeholder="First name" required>
                  <input type="text" id="middlename" v-model="middlename" placeholder="Middle name">
                  <input type="text" id="lastname" v-model="lastname" placeholder="Last name" required>
                </div>
                <small v-if="showWarnings && !firstname" class="text-danger">First name is required.</small>
                <small v-if="showWarnings && !lastname" class="text-danger">Last name is required.</small>
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" v-model="dob" required>
                <small v-if="showWarnings && !dob" class="text-danger">Date of birth is required.</small>
              </div>
              <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" v-model="gender" required>
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <small v-if="showWarnings && !gender" class="text-danger">Gender is required.</small>
              </div>
              <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" v-model="email" required>
                <small v-if="showWarnings && !email" class="text-danger">Email is required.</small>
              </div>
              <div class="form-group">
                <label for="student-id">ID No.:</label>
                <input type="text" id="student-id" v-model="studentID" required>
                <small v-if="showWarnings && !studentID" class="text-danger">ID is required.</small>
              </div>
              <div class="form-group">
                <label for="section">List of Section:</label>
                <select id="section" v-model="section" required>
                  <option value="" disabled>Select Section</option>
                  <option value="section1">Section 1</option>
                  <option value="section2">Section 2</option>
                </select>
                <small v-if="showWarnings && !section" class="text-danger">Section is required.</small>
              </div>
            </div>
            
            <!-- Contact Details -->
            <div class="form-section contact-details">
              <h3>Contact Details</h3>
              <div class="form-group">
                <label for="contact">Contact Number:</label>
                <input type="tel" id="contact" v-model="contact" required>
                <small v-if="showWarnings && !contact" class="text-danger">Contact number is required.</small>
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="address" required>
                <small v-if="showWarnings && !address" class="text-danger">Address is required.</small>
              </div>
              <div class="form-group">
                <label for="guardian-name">Guardian's Name:</label>
                <input type="text" id="guardian-name" v-model="guardianName" required>
                <small v-if="showWarnings && !guardianName" class="text-danger">Guardian's name is required.</small>
              </div>
              <div class="form-group">
                <label for="guardian-contact">Guardian's Contact Number:</label>
                <input type="tel" id="guardian-contact" v-model="guardianContact" required>
                <small v-if="showWarnings && !guardianContact" class="text-danger">Guardian's contact is required.</small>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
                <small v-if="showWarnings && !password" class="text-danger">Password is required.</small>
              </div>
              <div class="form-group">
                <label for="confirmpassword">Confirm Password:</label>
                <input type="password" id="confirmpassword" v-model="confirmpassword" required>
                <small v-if="showWarnings && password !== confirmpassword" class="text-danger">Passwords do not match.</small>
              </div>
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
      middlename: '',
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
          middlename: this.middlename,
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
      this.handleRegister();
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
.register-page {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #e6f2f8, #ffffff);
  min-height: 100vh;
  padding-bottom: 2rem;
}

.navbar {
  background-color: white;
  padding: 0.5rem 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 50px;
  height: auto;
  margin-right: 0.5rem;
}

.school-name {
  color: black;
  font-size: 1rem;
  font-weight: bold;
}

.btn-register {
  background-color: #018749;
  color: White;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.register-form-container {
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 1rem;
}

.card-body {
  padding: 2rem;
}

.card-title {
  color: Green;
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  color: black;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.name-inputs {
  display: flex;
  gap: 0.5rem;
}

.name-inputs input {
  flex: 1;
}

.contact-details {
  background-color: #f0f8ff;
  padding: 1rem;
  border-radius: 10px;
}
.text-danger {
  color: #dc3545;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .school-name {
    font-size: 0.875rem;
  }

  .card-body {
    padding: 1rem;
  }

  .name-inputs {
    flex-direction: column;
  }

  .name-inputs input {
    margin-bottom: 0.5rem;
  }
}
</style>