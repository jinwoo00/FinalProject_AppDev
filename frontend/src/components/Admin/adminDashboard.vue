<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="@/assets/munhi_logo.png" alt="Logo" />
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
              <a @click="activeTab = 'moodLogs'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'moodLogs' }]">
                Mood Logs
              </a>
              <a @click="activeTab = 'AdminCommunityManagement'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'AdminCommunityManagement' }]">
                Munhi Community
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="relative group">
              <button @click="handleLogout" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Logout</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              <span class="absolute right-0 top-10 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Log out
              </span>
            </div>
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
          <!-- User Statistics Cards - Only visible in the users tab -->
          <div v-if="activeTab === 'users'" class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd class="mt-1 text-3xl font-semibold text-gray-900">
                      {{ totalUsers }}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M19 8V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 8H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Male Users
                    </dt>
                    <dd class="mt-1 text-3xl font-semibold text-gray-900">
                      {{ maleUsers }}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 19V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 17H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Female Users
                    </dt>
                    <dd class="mt-1 text-3xl font-semibold text-gray-900">
                      {{ femaleUsers }}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <div v-if="activeTab === 'users'" class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2 class="text-lg leading-6 font-medium text-gray-900">User Management</h2>
              </div>
              <div class="overflow-x-auto w-full">
                <table class="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Role
                      </th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in users" :key="user.id">
                      <td class="px-6 py-4 whitespace-nowrap w-1/4 text-center">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.name }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap w-1/4 text-center">
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap w-1/4 text-center">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 justify-center">
                          {{ user.role }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap w-1/4 text-sm font-medium">
                        <div class="flex justify-center space-x-2">
                        <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                        <button v-if="user.role === 'counselor'" @click="moveCounselor(user)" class="text-green-600 hover:text-green-900">Move</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else-if="activeTab === 'appointments'" class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 class="text-lg leading-6 font-medium text-gray-900">Appointment Management</h2>
                <div class="flex">
                  <button @click="appointmentView = 'pending'" :class="['px-4 py-2 rounded-l-md text-sm font-medium transition-colors duration-150 ease-in-out', appointmentView === 'pending' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100']">
                    Pending
                  </button>
                  <button @click="appointmentView = 'accepted'" :class="['px-4 py-2 rounded-r-md text-sm font-medium transition-colors duration-150 ease-in-out', appointmentView === 'accepted' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100']">
                    Accepted
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto w-full">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Counselor</th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th v-if="appointmentView === 'pending'" scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="appointment in filteredAppointments" :key="appointment.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{{ appointment.studentName }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ appointment.counselorName }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ formatDate(appointment.dateTime) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-center">
                        <span :class="getStatusClass(appointment.status)">{{ appointment.status }}</span>
                      </td>
                      <td v-if="appointmentView === 'pending'" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <button @click="updateAppointmentStatus(appointment.id, 'accepted')" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-150 ease-in-out mr-2">
                          Accept
                        </button>
                        <button @click="updateAppointmentStatus(appointment.id, 'rejected')" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-150 ease-in-out">
                          Reject
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else-if="activeTab === 'analytics'" class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-semibold mb-6 text-gray-800">Analytics</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <div v-for="(count, emoji) in emojiCounts" :key="emoji" class="bg-gray-100 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-xl">
                  <div class="flex flex-col items-center">
                    <span class="text-3xl mb-2">{{ emoji }}</span>
                    <span class="text-2xl font-bold text-gray-700">{{ count }}</span>
                    <p class="text-xs text-gray-600 mt-1">{{ getEmojiLabel(emoji) }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-6">
                <h3 class="text-lg font-semibold mb-3 text-gray-800">Mood Distribution</h3>
                <div class="h-48 md:h-64">
                  <Bar :data="moodData" :options="chartOptions" />
                </div>
              </div>
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
            <div v-else-if="activeTab === 'AdminCommunityManagement'" class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto">
              <CommunityPage :isAdmin="true" />
            </div>
          </div>
        </div>
      </main>
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
                <input 
                  type="text" 
                  id="name" 
                  v-model="userForm.name" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
              </div>
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="userForm.email" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
              </div>
              <div class="mb-4">
                <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                <select 
                  id="role" 
                  v-model="userForm.role" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="student">Student</option>
                  <option value="administrator">Administrator</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                <select 
                  id="gender" 
                  v-model="userForm.gender" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="mt-5 sm:mt-4 flex justify-end space-x-2">
                <button 
                  type="button" 
                  @click="closeUserModal" 
                  class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  {{ selectedUser ? 'Update' : 'Add' }}
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
import { ref, onMounted, computed } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, orderBy, limit, addDoc, doc, updateDoc } from 'firebase/firestore'
import { Chart, registerables } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ref as firebaseRef, get, child, getDatabase } from 'firebase/database'
import CommunityPage from '../CommunityPage.vue'

Chart.register(...registerables)

const auth = getAuth()
const db = getFirestore()

const users = ref([])
const userCounts = ref({ students: 0, counselors: 0, administrators: 0 })
const maleUsers = ref(0)
const femaleUsers = ref(0)
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
const showAddUserModal = ref(false)
const selectedUser = ref(null)
const appointmentView = ref('pending')

const userForm = ref({
  name: '',
  email: '',
  role: 'student',
  gender: 'male'
})

const emojiCounts = ref({
  '😄': 0,
  '🙂': 0,
  '😐': 0,
  '🙁': 0,
  '😞': 0,
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
        maxTicksLimit: 5
      }
    },
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const fetchUsers = async () => {
  const usersCollection = collection(db, 'users')
  const userSnapshot = await getDocs(usersCollection)
  users.value = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
  userCounts.value = users.value.reduce((acc, user) => {
    if (user.role) {
      acc[user.role.toLowerCase()]++
    }
    if (user.gender) {
      if (user.gender.toLowerCase() === 'male') {
        maleUsers.value++
      } else if (user.gender.toLowerCase() === 'female') {
        femaleUsers.value++
      }
    }
    return acc
  }, { students: 0, counselors: 0, administrators: 0 })
}

const totalUsers = computed(() => {
  return users.value.length
})

const fetchMoodData = async () => {
  const moodLogsCollection = collection(db, 'moodLogs')
  const moodLogsQuery = query(moodLogsCollection, orderBy('timestamp', 'desc'), limit(100))
  const moodLogsSnapshot = await getDocs(moodLogsQuery)
  const moodLogsData = moodLogsSnapshot.docs.map(doc => doc.data())

  const moodCounts = moodLogsData.reduce((acc, log) => {
    acc[log.rating] = (acc[log.rating] || 0) + 1
    return acc
  }, {})

  // Update emojiCounts
  emojiCounts.value['😄'] = moodCounts[5] || 0
  emojiCounts.value['🙂'] = moodCounts[4] || 0
  emojiCounts.value['😐'] = moodCounts[3] || 0
  emojiCounts.value['🙁'] = moodCounts[2] || 0
  emojiCounts.value['😞'] = moodCounts[1] || 0

  moodData.value = {
    labels: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'],
    datasets: [{
      label: 'Mood Distribution',
      data: [moodCounts[1] || 0, moodCounts[2] || 0, moodCounts[3] || 0, moodCounts[4] || 0, moodCounts[5] || 0],
      backgroundColor: ['#F44336', '#FF9800', '#FFC107', '#4CAF50', '#2196F3']
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
  const confirmLogout = () => {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.innerHTML = `
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="logoutModal">
          <div class="bg-white p-5 rounded-lg shadow-xl">
            <h2 class="text-xl font-bold mb-4">Confirm Logout</h2>
            <p class="mb-4">Are you sure you want to log out?</p>
            <div class="flex justify-end">
              <button id="cancelLogout" class="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
              <button id="confirmLogout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('cancelLogout').onclick = () => {
        document.body.removeChild(modal);
        resolve(false);
      };

      document.getElementById('confirmLogout').onclick = () => {
        document.body.removeChild(modal);
        resolve(true);
      };
    });
  };

  if (await confirmLogout()) {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
      alert('Logout failed. Please try again.');
    }
  }
};

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

const updateAppointmentStatus = async (appointmentId, newStatus) => {
  const appointmentRef = doc(db, 'appointments', appointmentId)
  await updateDoc(appointmentRef, { status: newStatus })
  await fetchAppointments()
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
    await addDoc(collection(db, 'users'), userForm.value)
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
    role: 'student',
    gender: 'male'
  }
}

const moveCounselor = async (counselor) => {
  console.log('Moving counselor:', counselor)
  // Implement the logic to move a counselor
  // You might want to update the counselor's status or location in the database
}

const filteredAppointments = computed(() => {
  if (appointmentView.value === 'accepted') {
    return appointments.value.filter(appointment => appointment.status === 'accepted')
  } else {
    return appointments.value.filter(appointment => appointment.status !== 'accepted')
  }
})

const getEmojiLabel = (emoji) => {
  const labels = {
    '😄': 'Very Happy',
    '🙂': 'Happy',
    '😐': 'Neutral',
    '🙁': 'Sad',
    '😞': 'Very Sad'
  }
  return labels[emoji] || 'Unknown'
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

.bg-gray-100 {
  background-color: #f7fafc;
}

.text-gray-600 {
  color: #718096;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-800 {
  color: #2d3748;
}
</style>

