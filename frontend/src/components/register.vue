<template>
  <div class="register-page">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="@/assets/munhi_logo.png" alt="School Logo" class="logo-img">
          <span class="school-name">NAUJAN MUNICIPAL HIGH-SCHOOL</span>
        </div>
      </div>
    </nav>
    <div class="register-form-container">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Student Registration</h2>
          <!-- Registration Form -->
          <form @submit.prevent="handleRegister">
            <!-- Form sections -->
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
        <div class="button-container">
          <button @click="handleRegisterClick" class="btn-register">Register</button>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.register-page {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #31511E, #859F3D);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.navbar {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
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
  width: 90px;
  height: auto;
  margin-right: 1rem;
}

.school-name {
  color: #F6FCDF;
  font-size: 1.2rem;
  font-weight: 600;
}



.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  padding: 2rem;
}

.card-title {
  color: #31511E;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  color: #1b1c1b;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #859F3D;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #151515;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
input[type="password"],
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #859F3D;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #31511E;
  box-shadow: 0 0 0 2px rgba(49, 81, 30, 0.1);
}

.name-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.text-danger {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.button-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #31511E;
  border-radius: 2px;
}

.btn-register {
  background-color: #859F3D;
  color: #F6FCDF;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-register:hover {
  background-color: #6A7F31;
}

@media (max-width: 768px) {
  .name-inputs {
    grid-template-columns: 1fr;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.75rem;
  }
}
</style>