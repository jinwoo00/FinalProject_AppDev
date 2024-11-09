<template>
    <div class="mood-logs">
      <h3>Mood Logs</h3>
  
      <!-- Mood Logs Table -->
      <div class="mood-log-table">
        <h4>User Mood Logs</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Mood</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in moodLogs" :key="log.id">
              <td>{{ log.userName }}</td>
              <td>{{ log.mood }}</td>
              <td>{{ log.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Chatbot User Count -->
      <div class="chatbot-stats">
        <h4>Chatbot User Count</h4>
        <p>Total Users Interacted with Chatbot: {{ chatbotUserCount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MoodLogs",
    data() {
      return {
        moodLogs: [
          { id: 1, userName: "John Doe", mood: "Happy", date: "2024-11-01" },
          { id: 2, userName: "Jane Smith", mood: "Sad", date: "2024-11-02" },
          { id: 3, userName: "Alice Brown", mood: "Neutral", date: "2024-11-03" },
        ],
        chatbotUserCount: 3, // Example static count, should be dynamically fetched
      };
    },
  };
  </script>
  
  <style scoped>
  .mood-logs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .mood-log-table {
    width: 100%;
  }
  
  .mood-log-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .mood-log-table th,
  .mood-log-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  .chatbot-stats {
    margin-top: 20px;
  }
  </style>
  