<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a @click="activeTab = 'users'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'users' }]">
                Users
              </a>
              <a @click="activeTab = 'appointments'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'appointments' }]">
                Appointments
              </a>
              <a @click="activeTab = 'analytics'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'analytics' }]">
                Analytics
              </a>
              <a @click="activeTab = 'settings'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'settings' }]">
                Settings
              </a>
              <a @click="activeTab = 'snippet'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'snippet' }]">
                Snippet
              </a>
              <a @click="activeTab = 'moodLogs'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'moodLogs' }]">
                Mood Logs
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button @click="handleLogout" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Logout</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">
            <div v-if="activeTab === 'users'" class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto">
              <h2 class="text-xl font-semibold mb-4">User Management</h2>
              <div class="mb-4">
                <button @click="showAddUserModal = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Add User
                </button>
              </div>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in users" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.name }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button v-if="user.role === 'counselor'" @click="moveCounselor(user)" class="text-green-600 hover:text-green-900">Move</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else-if="activeTab === 'appointments'" class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto">
              <h2 class="text-xl font-semibold mb-4">Appointment Management</h2>
              <div class="mb-4">
                <button @click="showAddAppointmentModal = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Appointment
                </button>
              </div>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counselor</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="appointment in appointments" :key="appointment.id">
                    <td class="px-6 py-4 whitespace-nowrap">{{ appointment.studentName }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ appointment.counselorName }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(appointment.dateTime) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(appointment.status)">{{ appointment.status }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button @click="editAppointment(appointment)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button @click="deleteAppointment(appointment.id)" class="text-red-600 hover:text-red-900 mr-2">Delete</button>
                      <button @click="updateAppointmentStatus(appointment.id, 'accepted')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                        Accept
                      </button>
                      <button @click="updateAppointmentStatus(appointment.id, 'rejected')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Reject
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else-if="activeTab === 'analytics'" class="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h2 class="text-xl font-semibold mb-4">Analytics</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow">
                  <h3 class="text-lg font-medium mb-2">Mood Distribution</h3>
                  <Bar :data="moodData" :options="{ responsive: true }" />
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                  <h3 class="text-lg font-medium mb-2">System Usage</h3>
                  <p>Placeholder for system usage statistics</p>
                </div>
              </div>
            </div>
            <div v-else-if="activeTab === 'settings'" class="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h2 class="text-xl font-semibold mb-4">System Settings</h2>
              <form class="space-y-4">
                <div>
                  <label for="chatbot-threshold" class="block text-sm font-medium text-gray-700">Chatbot Escalation Threshold</label>
                  <input type="number" name="chatbot-threshold" id="chatbot-threshold" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="3">
                </div>
                <div>
                  <label for="session-timeout" class="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                  <input type="number" name="session-timeout" id="session-timeout" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="30">
                </div>
                <div>
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
            <div v-else-if="activeTab === 'snippet'" class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto">
              <h2 class="text-xl font-semibold mb-4">Snippet Content</h2>
              <pre class="whitespace-pre-wrap">{{ snippetContent }}</pre>
            </div>
            <div v-else-if="activeTab === 'moodLogs'" class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto">
              <h2 class="text-xl font-semibold mb-4">Student Mood Logs</h2>
              <div v-if="moodLogs.length === 0" class="text-gray-500 text-center py-4">
                No mood logs available.
              </div>
              <ul v-else class="space-y-4">
                <li v-for="log in moodLogs" :key="log.id" class="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-indigo-600">{{ log.userName }}</p>
                      <p class="text-sm text-gray-500">{{ log.userEmail }}</p>
                    </div>
                    <span class="text-2xl">{{ getMoodEmoji(log.rating) }}</span>
                  </div>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">{{ formatDate(log.timestamp) }}</p>
                    <p class="mt-1 text-sm text-gray-900">{{ log.note }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- Add/Edit Appointment Modal -->
  <div v-if="showAddAppointmentModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {{ selectedAppointment ? 'Edit Appointment' : 'Add New Appointment' }}
          </h3>
          <div class="mt-2">
            <form @submit.prevent="handleAppointmentSubmit">
              <div class="mb-4">
                <label for="studentName" class="block text-sm font-medium text-gray-700">Student Name</label>
                <input type="text" id="studentName" v-model="appointmentForm.studentName" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="counselorName" class="block text-sm font-medium text-gray-700">Counselor Name</label>
                <input type="text" id="counselorName" v-model="appointmentForm.counselorName" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="dateTime" class="block text-sm font-medium text-gray-700">Date & Time</label>
                <input type="datetime-local" id="dateTime" v-model="appointmentForm.dateTime" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" v-model="appointmentForm.status" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                  {{ selectedAppointment ? 'Update' : 'Add' }}
                </button>
                <button type="button" @click="closeAppointmentModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add/Edit User Modal -->
  <div v-if="showAddUserModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {{ selectedUser ? 'Edit User' : 'Add New User' }}
          </h3>
          <div class="mt-2">
            <form @submit.prevent="handleUserSubmit">
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" v-model="userForm.name" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" v-model="userForm.email" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                <select id="role" v-model="userForm.role" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="student">Student</option>
                  <option value="counselor">Counselor</option>
                  <option value="administrator">Administrator</option>
                </select>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                  {{ selectedUser ? 'Update' : 'Add' }}
                </button>
                <button type="button" @click="closeUserModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, orderBy, limit, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Chart, registerables } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ref as firebaseRef, get, child, getDatabase } from 'firebase/database'

Chart.register(...registerables)

const auth = getAuth()
const db = getFirestore()

const users = ref([])
const userCounts = ref({ students: 0, counselors: 0, administrators: 0 })
const moodData = ref({
  labels: [],
  datasets: [{
    label: 'Mood Distribution',
    data: [],
    backgroundColor: []
  }]
})
const activeTab = ref('users')
const snippetContent = ref('')
const bookedAppointments = ref([])
const moodLogs = ref([])
const appointments = ref([])
const showAddAppointmentModal = ref(false)
const showAddUserModal = ref(false)
const selectedAppointment = ref(null)
const selectedUser = ref(null)

const appointmentForm = ref({
  studentName: '',
  counselorName: '',
  dateTime: '',
  status: 'scheduled'
})

const userForm = ref({
  name: '',
  email: '',
  role: 'student'
})

const fetchUsers = async () => {
  const usersCollection = collection(db, 'users')
  const userSnapshot = await getDocs(usersCollection)
  users.value = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
  userCounts.value = users.value.reduce((acc, user) => {
    if (user.role) {
      acc[user.role.toLowerCase()]++
    }
    return acc
  }, { students: 0, counselors: 0, administrators: 0 })
}

const fetchMoodData = async () => {
  const moodLogsCollection = collection(db, 'moodLogs')
  const moodLogsQuery = query(moodLogsCollection, orderBy('timestamp', 'desc'), limit(100))
  const moodLogsSnapshot = await getDocs(moodLogsQuery)
  const moodLogsData = moodLogsSnapshot.docs.map(doc => doc.data())

  const moodCounts = moodLogsData.reduce((acc, log) => {
    acc[log.rating] = (acc[log.rating] || 0) + 1
    return acc
  }, {})

  moodData.value = {
    labels: Object.keys(moodCounts),
    datasets: [{
      label: 'Mood Distribution',
      data: Object.values(moodCounts),
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336', '#9E9E9E']
    }]
  }
}

const fetchSnippetContent = async () => {
  const db = getDatabase()
  const snippetRef = firebaseRef(db, 'snippets/wZrAIGPkoRISSyEzjGKNpUggHLN83R')
  const snapshot = await get(child(snippetRef, 'content'))
  if (snapshot.exists()) {
    snippetContent.value = snapshot.val()
  } else {
    console.log('No data available')
  }
}

const fetchBookedAppointments = async () => {
  const appointmentsCollection = collection(db, 'appointments')
  const appointmentsQuery = query(appointmentsCollection, orderBy('createdAt', 'desc'), limit(5))
  const appointmentSnapshot = await getDocs(appointmentsQuery)
  bookedAppointments.value = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const fetchMoodLogs = async () => {
  const moodLogsCollection = collection(db, 'moodLogs')
  const moodLogsQuery = query(moodLogsCollection, orderBy('timestamp', 'desc'), limit(20))
  const moodLogsSnapshot = await getDocs(moodLogsQuery)
  moodLogs.value = moodLogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const fetchAppointments = async () => {
  const appointmentsCollection = collection(db, 'appointments')
  const appointmentsSnapshot = await getDocs(appointmentsCollection)
  appointments.value = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    console.log('User logged out successfully')
    // You might want to use vue-router to redirect the user
    // router.push('/login')
  } catch (error) {
    console.error('Logout failed', error)
  }
}

const getMoodEmoji = (rating) => {
  const emojis = ['😞', '🙁', '😐', '🙂', '😄']
  return emojis[rating - 1] || '❓'
}

const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleString()
  }
  return 'Date not available'
}

const getStatusClass = (status) => {
  const classes = {
    'scheduled': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'accepted': 'bg-blue-100 text-blue-800',
    'rejected': 'bg-gray-100 text-gray-800'
  }
  return `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes[status] || 'bg-gray-100 text-gray-800'}`
}

const addAppointment = async (appointmentData) => {
  await addDoc(collection(db, 'appointments'), appointmentData)
  await fetchAppointments()
  showAddAppointmentModal.value = false
}

const editAppointment = (appointment) => {
  selectedAppointment.value = appointment
  appointmentForm.value = { ...appointment }
  showAddAppointmentModal.value = true
}

const deleteAppointment = async (appointmentId) => {
  await deleteDoc(doc(db, 'appointments', appointmentId))
  await fetchAppointments()
}

const updateAppointmentStatus = async (appointmentId, newStatus) => {
  const appointmentRef = doc(db, 'appointments', appointmentId)
  await updateDoc(appointmentRef, { status: newStatus })
  await fetchAppointments()
}

const handleAppointmentSubmit = async () => {
  if (selectedAppointment.value) {
    await updateDoc(doc(db, 'appointments', selectedAppointment.value.id), appointmentForm.value)
  } else {
    await addAppointment(appointmentForm.value)
  }
  closeAppointmentModal()
  await fetchAppointments()
}

const closeAppointmentModal = () => {
  showAddAppointmentModal.value = false
  selectedAppointment.value = null
  appointmentForm.value = {
    studentName: '',
    counselorName: '',
    dateTime: '',
    status: 'scheduled'
  }
}

const addUser = async (userData) => {
  await addDoc(collection(db, 'users'), userData)
  await fetchUsers()
  showAddUserModal.value = false
}

const editUser = (user) => {
  selectedUser.value = user
  userForm.value = { ...user }
  showAddUserModal.value = true
}

const handleUserSubmit = async () => {
  if (selectedUser.value) {
    await updateDoc(doc(db, 'users', selectedUser.value.id), userForm.value)
  } else {
    await addUser(userForm.value)
  }
  closeUserModal()
  await fetchUsers()
}

const closeUserModal = () => {
  showAddUserModal.value = false
  selectedUser.value = null
  userForm.value = {
    name: '',
    email: '',
    role: 'student'
  }
}

const moveCounselor = async (counselor) => {
  // Implement the logic to move a counselor
  console.log('Moving counselor:', counselor)
  // You might want to update the counselor's status or location in the database
}

onMounted(() => {
  fetchUsers()
  fetchMoodData()
  fetchSnippetContent()
  fetchBookedAppointments()
  fetchMoodLogs()
  fetchAppointments()
})
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';

:root {
  --color-primary: #3490dc;
  --color-primary-dark: #2779bd;
}

.bg-primary {
  background-color: var(--color-primary);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--color-primary-dark);
}

.text-primary {
  color: var(--color-primary);
}

.focus\:border-primary:focus {
  border-color: var(--color-primary);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}
</style>