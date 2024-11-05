<template>
    <div>
      <h1>Admin Dashboard</h1>
      <input v-model="userId" placeholder="Enter User ID" />
      <select v-model="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button @click="updateRole">Set Role</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { setUserRole } from '../adminService'; // Siguraduhing tama ang path
  
  export default {
    name: 'AdminDashboard',
    data() {
      return {
        userId: '',
        role: 'user', // Default role
        message: ''
      };
    },
    methods: {
      async updateRole() {
        try {
          await setUserRole(this.userId, this.role);
          this.message = `Role updated to ${this.role} successfully!`;
        } catch (error) {
          this.message = 'Failed to update role.';
        }
      }
    }
  };
  </script>
  