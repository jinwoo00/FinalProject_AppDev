<template>
    <div class="profile-container">
      <div class="profile-header">
        <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
        <h1 class="profile-name">{{ name }}</h1>
        <p class="profile-bio">{{ bio }}</p>
      </div>
      <div class="profile-details">
        <h2>About Me</h2>
        <p>{{ about }}</p>
        <h2>Projects</h2>
        <ul>
          <li v-for="project in projects" :key="project">{{ project }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: 'Ibrahim',
        bio: 'Welcome to my profile! I\'m a developer with a passion for creating innovative solutions.',
        about: 'I am interested in content management systems (CMS) and have experience in developing web applications using Django.',
        profilePicture: 'profile-picture.jpg', // Replace with your image path
        projects: [
          'Task Management App',
          'Online Store',
          'Job Board App',
          'Real-time Inventory System for MR. DIY Calapan',
          'Website for Vilma\'s RTW',
          'Travel Agency Project using Piwigo CMS',
          'Capstone Project: Bakery Management System',
          'SweetRise: Smart Management for CAKEs',
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .profile-container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      font-family: 'Arial', sans-serif;
  }
  
  .profile-header {
      text-align: center;
      margin-bottom: 30px;
  }
  
  .profile-picture {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 3px solid #4CAF50; /* Green border */
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .profile-name {
      font-size: 2.5em;
      margin: 15px 0;
      color: #333;
  }
  
  .profile-bio {
      color: #666;
      font-style: italic;
  }
  
  .profile-details {
      padding: 10px;
  }
  
  h2 {
      color: #4CAF50; /* Green heading */
      margin-top: 20px;
  }
  
  ul {
      list-style-type: none;
      padding: 0;
  }
  
  ul li {
      background: #f0f0f0;
      margin: 10px 0;
      padding: 12px;
      border-radius: 8px;
      transition: background-color 0.3s;
  }
  
  ul li:hover {
      background-color: #e0e0e0; /* Darker on hover */
  }
  </style>
  