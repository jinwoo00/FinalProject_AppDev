<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Mobile menu button (Hamburger) -->
     <!-- Hamburger Button for Mobile -->
  <div class="md:hidden">
    <button @click="toggleMenu" class="fixed left-4 top-4 z-50 p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <span class="sr-only">Open menu</span>
    </button>
  </div>
  <!-- Sidebar (Hidden on mobile, toggled by hamburger) -->
  <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen, 'md:block': true}" class="w-64 bg-blue-600 p-4 transition-all duration-300 ease-in-out">
    <nav class="space-y-4">
      <button
        v-for="section in sections"
        :key="section.name"
        @click="toggleSection(section.name)"
        class="w-full justify-start text-white hover:bg-blue-700 px-4 py-2 rounded"
      >
        {{ section.label }}
      </button>
    </nav>
  </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-auto p-6">
      <h1 class="mb-8 text-center text-3xl font-bold text-blue-600">Admin Dashboard</h1>

      <!-- Appointment Management Section -->
      <section v-if="activeSection === 'appointments'" class="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold text-gray-800">Appointment Management</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th v-for="header in appointmentHeaders" :key="header" class="px-4 py-2 text-left">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id" class="border-b">
                <td class="px-4 py-2">{{ appointment.date }}</td>
                <td class="px-4 py-2">{{ appointment.time }}</td>
                <td class="px-4 py-2">{{ appointment.student }}</td>
                <td class="px-4 py-2">{{ appointment.counselor }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="{
                      'bg-green-200 text-green-800': appointment.status === 'Confirmed',
                      'bg-yellow-200 text-yellow-800': appointment.status === 'Pending',
                      'bg-red-200 text-red-800': appointment.status === 'Cancelled'
                    }"
                    class="rounded-full px-2 py-1 text-sm"
                  >
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="px-4 py-2">
                  <button @click="editAppointment(appointment)" class="mr-2 px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                  <button @click="cancelAppointment(appointment)" class="px-3 py-1 bg-red-500 text-white rounded">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Session Notes Section -->
      <section v-if="activeSection === 'notes'" class="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold text-gray-800">Session Notes</h2>
        <div class="mb-4">
          <label for="appointmentSelect" class="mb-2 block text-sm font-medium text-gray-700">Select Appointment</label>
          <select
            id="appointmentSelect"
            v-model="selectedAppointmentId"
            class="w-full rounded-md border p-2"
          >
            <option value="">Select an appointment</option>
            <option v-for="appointment in appointments" :key="appointment.id" :value="appointment.id">
              {{ appointment.date }} - {{ appointment.time }} - {{ appointment.student }}
            </option>
          </select>
        </div>
        <textarea
          v-model="sessionNotes"
          placeholder="Enter session notes..."
          class="h-32 w-full resize-none rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button @click="saveNotes" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Save Notes</button>
      </section>

      <!-- Online Counseling Section -->
      <section v-if="activeSection === 'counseling'" class="rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold text-gray-800">Online Counseling</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 text-lg font-medium">Upcoming Online Sessions</h3>
            <ul class="space-y-2">
              <li v-for="session in onlineSessions" :key="session.id" class="rounded-md bg-gray-50 p-2">
                {{ session.date }} - {{ session.time }} - {{ session.student }}
                <button @click="startSession(session)" class="ml-2 px-3 py-1 bg-blue-500 text-white rounded">Start</button>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-medium">Chat Messages</h3>
            <div class="mb-4 h-64 overflow-y-auto rounded-md bg-gray-50 p-4">
              <p v-for="message in chatMessages" :key="message.id" class="mb-2">
                <strong>{{ message.sender }}:</strong> {{ message.text }}
              </p>
            </div>
            <div class="flex">
              <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Type a message..."
                class="flex-grow rounded-l-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button @click="sendMessage" class="rounded-r-md bg-blue-500 px-4 py-2 text-white">Send</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeSection = ref(null)
const isSidebarOpen = ref(false)

const appointments = reactive([/* Your appointment data */])
const selectedAppointmentId = ref(null)
const sessionNotes = ref('')
const onlineSessions = reactive([/* Your online session data */])
const chatMessages = reactive([/* Your chat messages data */])
const newMessage = ref('')

const sections = [
  { name: 'appointments', label: 'Appointment Management' },
  { name: 'notes', label: 'Session Notes' },
  { name: 'counseling', label: 'Online Counseling' },
]

const appointmentHeaders = ['Date', 'Time', 'Student', 'Counselor', 'Status', 'Actions']

const toggleSection = (section) => {
  activeSection.value = activeSection.value === section ? null : section
}

const toggleMenu = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const editAppointment = (appointment) => {
  alert(`Editing appointment for ${appointment.student}`)
}

const cancelAppointment = (appointment) => {
  if (confirm(`Are you sure you want to cancel the appointment for ${appointment.student}?`)) {
    const index = appointments.findIndex(a => a.id === appointment.id)
    if (index !== -1) appointments.splice(index, 1)
  }
}

const saveNotes = () => {
  alert('Session notes saved')
}

const startSession = (session) => {
  alert(`Starting session for ${session.student}`)
}

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    chatMessages.push({ id: chatMessages.length + 1, sender: 'You', text: newMessage.value })
    newMessage.value = ''
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
