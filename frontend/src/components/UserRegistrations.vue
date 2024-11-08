<template>
    <div class="user-registrations">
      <h3>User Registrations</h3>
      <p>Total Registered Users: {{ users.length }}</p>
  
      <!-- Displaying user names -->
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
      </ul>
      <p v-else>No users found.</p>
    </div>
  </template>
  
  <script>
  import { db } from '../firebaseConfig';
  import { collection, getDocs } from 'firebase/firestore';
  
  export default {
    name: 'UserRegistrations',
    data() {
      return {
        users: [], // Store the list of users
      };
    },
    async created() {
      // Fetch the user data when the component is created
      try {
        const querySnapshot = await getDocs(collection(db, 'students')); // Assuming 'students' collection contains users
        this.users = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .user-registrations {
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    padding: 5px 0;
    font-size: 16px;
  }
  
  p {
    font-size: 18px;
  }
  </style>
  