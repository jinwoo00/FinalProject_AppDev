<template>
    <div class="add-student-page">
      <h1>Add Student</h1>
      <form @submit.prevent="addStudent">
        <div class="form-group">
          <label for="name">Student Name</label>
          <input
            type="text"
            v-model="studentName"
            id="name"
            class="form-control"
            placeholder="Enter student name"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="email">Student Email</label>
          <input
            type="email"
            v-model="studentEmail"
            id="email"
            class="form-control"
            placeholder="Enter student email"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="grade">Grade Level</label>
          <select v-model="studentGrade" id="grade" class="form-select" required>
            <option value="" disabled>Select grade level</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="birthday">Student Birthday</label>
          <input
            type="date"
            v-model="studentBirthday"
            id="birthday"
            class="form-control"
            @change="calculateAge"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="age">Student Age</label>
          <input
            type="text"
            v-model="studentAge"
            id="age"
            class="form-control"
            placeholder="Age will be calculated automatically"
            readonly
          />
        </div>
  
        <button type="submit" class="btn btn-primary mt-3">Add Student</button>
      </form>
  
      <p v-if="message" class="text-success mt-3">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { db } from '../firebaseConfig';
  import { doc, setDoc } from 'firebase/firestore';
  
  export default {
    name: 'AddStudent',
    data() {
      return {
        studentName: '',
        studentEmail: '',
        studentGrade: '',
        studentBirthday: '',
        studentAge: '',
        message: '',
      };
    },
    methods: {
      // Calculate the student's age based on the birthday
      calculateAge() {
        if (this.studentBirthday) {
          const birthDate = new Date(this.studentBirthday);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const month = today.getMonth();
          const day = today.getDate();
  
          if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
            age--;
          }
  
          this.studentAge = age;
        }
      },
  
      async addStudent() {
        try {
          // Create a unique ID for the student
          const studentId = this.studentEmail.split('@')[0];
  
          // Add student to Firestore
          await setDoc(doc(db, 'students', studentId), {
            name: this.studentName,
            email: this.studentEmail,
            grade: this.studentGrade,
            birthday: this.studentBirthday,
            age: this.studentAge,
          });
  
          // Display success message
          this.message = 'Student added successfully!';
  
          // Clear form fields
          this.studentName = '';
          this.studentEmail = '';
          this.studentGrade = '';
          this.studentBirthday = '';
          this.studentAge = '';
        } catch (error) {
          console.error('Error adding student:', error);
          this.message = 'Failed to add student.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-student-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control,
  .form-select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
  </style>
  