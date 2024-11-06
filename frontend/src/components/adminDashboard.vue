<template>
    <div class="admin-dashboard">
      <nav class="sidebar">
        <h2>Admin Menu</h2>
        <ul>
          <li @click="setActiveTab('setRole')">Set User Role</li>
          <li @click="setActiveTab('addStudent')">Add Student</li>
          <li @click="setActiveTab('userRegistrations')">User Registrations</li>
        </ul>
      </nav>
      <div class="content">
        <h1>Admin Dashboard</h1>
        
        <!-- Set User Role Tab -->
        <div v-if="activeTab === 'setRole'">
          <h3>Set User Role</h3>
          <input v-model="userId" placeholder="Enter User ID" />
          <select v-model="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button @click="updateRole">Set Role</button>
          <p v-if="message">{{ message }}</p>
        </div>
  
        <!-- Add Student Tab -->
        <div v-if="activeTab === 'addStudent'">
          <h3>Add Student</h3>
          <input v-model="studentName" placeholder="Student Name" />
          <input v-model="studentEmail" placeholder="Student Email" />
          <button @click="addStudent">Add Student</button>
          <p v-if="addMessage">{{ addMessage }}</p>
        </div>
  
        <!-- User Registrations Tab -->
        <div v-if="activeTab === 'userRegistrations'">
          <h3>User Registrations</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.firstname }} {{ user.lastname }}</td> <!-- Display Full Name -->
                <td>{{ user.email }}</td>
                <td>{{ user.status }}</td>
                <td>
                  <button @click="approveUser(user.id)">Approve</button>
                  <button @click="declineUser(user.id)">Decline</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { setUserRole } from '../adminService'; // Ensure correct path
  import { db } from '../firebaseConfig';
  import { doc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
  
  export default {
    name: 'AdminDashboard',
    data() {
      return {
        userId: '',
        role: 'user', // Default role
        studentName: '',
        studentEmail: '',
        message: '',
        addMessage: '',
        activeTab: 'setRole', // Default tab
        users: [], // For storing user registrations
      };
    },
    methods: {
      async fetchUsers() {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        this.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      },
      async updateRole() {
        try {
          await setUserRole(this.userId, this.role);
          this.message = `Role updated to ${this.role} successfully!`;
        } catch (error) {
          this.message = 'Failed to update role.';
        }
      },
      async addStudent() {
        try {
          const studentId = this.studentEmail.split('@')[0]; // Sample student ID
          await setDoc(doc(db, 'students', studentId), {
            name: this.studentName,
            email: this.studentEmail,
          });
          this.addMessage = 'Student added successfully!';
        } catch (error) {
          this.addMessage = 'Failed to add student.';
        }
      },
      async approveUser(userId) {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { status: 'approved' });
        this.message = `User ${userId} approved successfully!`;
        this.fetchUsers(); // Refresh user list
      },
      async declineUser(userId) {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { status: 'declined' });
        this.message = `User ${userId} declined successfully!`;
        this.fetchUsers(); // Refresh user list
      },
      setActiveTab(tab) {
        this.activeTab = tab;
        this.message = ''; // Clear messages when switching tabs
        this.addMessage = '';
        if (tab === 'userRegistrations') {
          this.fetchUsers(); // Fetch users only for this tab
        }
      },
    },
    mounted() {
      this.fetchUsers(); // Initial fetch of users
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar h2 {
    margin: 0 0 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .sidebar ul li:hover {
    background-color: #ddd;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    background-color: #fff;
  }
  
  h1, h3 {
    margin-top: 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin-right: 10px;
  }
  </style>
  