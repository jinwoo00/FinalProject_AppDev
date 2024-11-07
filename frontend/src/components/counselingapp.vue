<template>
    <div id="counselingapp">
      <h1>Counseling Appointment Management</h1>
  
      <!-- Appointment Booking -->
      <section>
        <h2>Book a Counseling Appointment</h2>
        <div v-for="slot in availableSlots" :key="slot.id">
          <p>{{ slot.time }} - {{ slot.status }}</p>
          <button @click="bookAppointment(slot)" :disabled="slot.status === 'Booked'">Book</button>
        </div>
      </section>
  
      <!-- Session Management -->
      <section>
        <h2>Session Notes</h2>
        <textarea v-model="sessionNotes" placeholder="Enter session notes..."></textarea>
        <button @click="saveNotes">Save Notes</button>
      </section>
  
      <!-- Follow-Up Appointments -->
      <section>
        <h2>Schedule a Follow-Up Appointment</h2>
        <input type="datetime-local" v-model="followUpDate" />
        <button @click="scheduleFollowUp">Schedule</button>
      </section>
  
      <!-- Online Counseling -->
      <section>
        <h2>Online Counseling Session</h2>
        <div v-if="isChat">
          <input v-model="message" placeholder="Type a message..." />
          <button @click="sendMessage">Send</button>
          <div class="chat-log">
            <p v-for="msg in chatLog" :key="msg.id">{{ msg.text }}</p>
          </div>
        </div>
        <div v-if="isVideo">
          <p>Video session placeholder</p> <!-- Placeholder for video interface -->
        </div>
        <button @click="toggleMode">Switch to {{ isChat ? 'Video' : 'Chat' }}</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CounselingApp',
    data() {
      return {
        availableSlots: [
          { id: 1, time: '9:00 AM - 10:00 AM', status: 'Available' },
          { id: 2, time: '10:30 AM - 11:30 AM', status: 'Booked' },
        ],
        sessionNotes: '',
        followUpDate: '',
        isChat: true,
        message: '',
        chatLog: [],
      };
    },
    methods: {
      // Booking an appointment
      bookAppointment(slot) {
        slot.status = 'Booked';
        alert(`Appointment booked for ${slot.time}`);
        // Here you would also send an email notification or update the backend
      },
      // Saving session notes 
      saveNotes() {
        alert('Notes saved successfully');
        // Send session notes to a backend for secure storage
      },
      // Scheduling a follow-up appointment
      scheduleFollowUp() {
        alert(`Follow-up scheduled for ${this.followUpDate}`);
        // Backend integration for follow-up appointment scheduling
      },
      // Sending a message in chat
      sendMessage() {
        if (this.message.trim()) {
          this.chatLog.push({ id: Date.now(), text: this.message });
          this.message = '';
          // Here, you’d send the encrypted message to a backend or Firebase
        }
      },
      // Switching between chat and video modes
      toggleMode() {
        this.isChat = !this.isChat;
      },
    },
  };
  </script>
  
  <style scoped>
  #counseling-app {
    max-width: 600px;
    margin: auto;
    font-family: Arial, sans-serif;
  }
  
  section {
    margin-bottom: 20px;
  }
  
  button {
    margin-top: 10px;
  }
  
  .chat-log {
    border: 1px solid #ccc;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;
    margin-top: 10px;
  }
  </style>
  