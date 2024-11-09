<template>
  <div class="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-center text-blue-600">Admin Dashboard</h1>

    <!-- Appointment Management -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Appointment Management</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 text-left">Date</th>
              <th class="py-2 px-4 text-left">Time</th>
              <th class="py-2 px-4 text-left">Student</th>
              <th class="py-2 px-4 text-left">Counselor</th>
              <th class="py-2 px-4 text-left">Status</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id" class="border-b">
              <td class="py-2 px-4">{{ appointment.date }}</td>
              <td class="py-2 px-4">{{ appointment.time }}</td>
              <td class="py-2 px-4">{{ appointment.student }}</td>
              <td class="py-2 px-4">{{ appointment.counselor }}</td>
              <td class="py-2 px-4">
                <span :class="{
                  'bg-green-200 text-green-800': appointment.status === 'Confirmed',
                  'bg-yellow-200 text-yellow-800': appointment.status === 'Pending',
                  'bg-red-200 text-red-800': appointment.status === 'Cancelled'
                }" class="px-2 py-1 rounded-full text-sm">
                  {{ appointment.status }}
                </span>
              </td>
              <td class="py-2 px-4">
                <button @click="editAppointment(appointment)" class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2">Edit</button>
                <button @click="cancelAppointment(appointment)" class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Session Notes -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Session Notes</h2>
      <div class="mb-4">
        <label for="appointmentSelect" class="block text-sm font-medium text-gray-700 mb-2">Select Appointment</label>
        <select id="appointmentSelect" v-model="selectedAppointmentId" class="w-full p-2 border rounded-md">
          <option v-for="appointment in appointments" :key="appointment.id" :value="appointment.id">
            {{ appointment.date }} - {{ appointment.time }} - {{ appointment.student }}
          </option>
        </select>
      </div>
      <textarea 
        v-model="sessionNotes" 
        placeholder="Enter session notes..." 
        class="w-full h-32 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button 
        @click="saveNotes" 
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Save Notes
      </button>
    </section>

    <!-- Online Counseling -->
    <section class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Online Counseling</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 class="text-lg font-medium mb-2">Upcoming Online Sessions</h3>
          <ul class="space-y-2">
            <li v-for="session in onlineSessions" :key="session.id" class="bg-gray-50 p-2 rounded-md">
              {{ session.date }} - {{ session.time }} - {{ session.student }}
              <button @click="startSession(session)" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">Start</button>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-2">Chat Messages</h3>
          <div class="bg-gray-50 p-4 rounded-md h-64 overflow-y-auto mb-4">
            <p v-for="message in chatMessages" :key="message.id" class="mb-2">
              <strong>{{ message.sender }}:</strong> {{ message.text }}
            </p>
          </div>
          <div class="flex">
            <input 
              v-model="newMessage" 
              placeholder="Type a message..." 
              class="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="sendMessage"
            />
            <button 
              @click="sendMessage" 
              class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      appointments: [
        { id: 1, date: '2024-03-15', time: '9:00 AM - 10:00 AM', student: 'John Doe', counselor: 'Dr. Smith', status: 'Confirmed' },
        { id: 2, date: '2024-03-15', time: '2:00 PM - 3:00 PM', student: 'Jane Smith', counselor: 'Dr. Johnson', status: 'Pending' },
        { id: 3, date: '2024-03-16', time: '10:00 AM - 11:00 AM', student: 'Bob Wilson', counselor: 'Dr. Williams', status: 'Cancelled' },
      ],
      selectedAppointmentId: null,
      sessionNotes: '',
      onlineSessions: [
        { id: 1, date: '2024-03-15', time: '11:00 AM - 12:00 PM', student: 'Alice Brown' },
        { id: 2, date: '2024-03-16', time: '1:00 PM - 2:00 PM', student: 'Charlie Davis' },
      ],
      chatMessages: [
        { id: 1, sender: 'John Doe', text: 'Hello, I have a question about my upcoming appointment.' },
        { id: 2, sender: 'Dr. Smith', text: 'Sure, how can I help you?' },
      ],
      newMessage: '',
    };
  },
  methods: {
    editAppointment(appointment) {
      // Implement edit functionality
      alert(`Editing appointment for ${appointment.student}`);
    },
    cancelAppointment(appointment) {
      // Implement cancel functionality
      if (confirm(`Are you sure you want to cancel the appointment for ${appointment.student}?`)) {
        appointment.status = 'Cancelled';
      }
    },
    saveNotes() {
      if (this.selectedAppointmentId && this.sessionNotes.trim()) {
        // Simulating an API call to save notes
        setTimeout(() => {
          alert('Session notes saved successfully');
          this.sessionNotes = '';
          this.selectedAppointmentId = null;
        }, 500);
      } else {
        alert('Please select an appointment and enter notes before saving.');
      }
    },
    startSession(session) {
      // Implement start online session functionality
      alert(`Starting online session with ${session.student}`);
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatMessages.push({
          id: this.chatMessages.length + 1,
          sender: 'Dr. Smith',
          text: this.newMessage
        });
        this.newMessage = '';
      }
    },
  },
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>