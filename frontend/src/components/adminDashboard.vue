<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-100 w-auto" src="@/assets/munhi_logo.png" alt="Logo" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a @click="activeTab = 'users'" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium', { 'border-indigo-500 text-gray-900': activeTab === 'users' }]">
                Users
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
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Total Students
                          </dt>
                          <dd class="text-lg font-medium text-gray-900">
                            {{ userCounts.students }}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Total Counselors
                          </dt>
                          <dd class="text-lg font-medium text-gray-900">
                            {{ userCounts.counselors }}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div class="ml-5 w-0 flex-1">
                        <dl>
                          <dt class="text-sm font-medium text-gray-500 truncate">
                            Total Administrators
                          </dt>
                          <dd class="text-lg font-medium text-gray-900">
                            {{ userCounts.administrators }}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
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
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Booked Appointments Container with Accept/Cancel functionality -->
              <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Booked Appointments</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">Latest appointments booked by users</p>
                </div>
                <div class="border-t border-gray-200">
                  <ul v-if="bookedAppointments.length > 0" class="divide-y divide-gray-200">
                    <li v-for="appointment in bookedAppointments" :key="appointment.id" class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-indigo-600 truncate">
                          {{ appointment.studentName }}
                        </p>
                        <div class="ml-2 flex-shrink-0 flex">
                          <p :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', 
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            appointment.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800']">
                            {{ appointment.status }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="sm:flex">
                          <p class="flex items-center text-sm text-gray-500">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                            {{ appointment.date }}
                          </p>
                          <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-6a1 1 0 10-2 0v3a1 1 0 102 0V9z" clip-rule="evenodd" />
                            </svg>
                            {{ appointment.time }}
                          </p>
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                          </svg>
                          {{ appointment.counselor }}
                        </div>
                      </div>
                      <div class="mt-4 flex justify-end space-x-2">
                        <button 
                          v-if="appointment.status === 'pending'"
                          @click="acceptAppointment(appointment.id)" 
                          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                          Accept
                        </button>
                        <button 
                          v-if="appointment.status !== 'cancelled'"
                          @click="cancelAppointment(appointment.id)" 
                          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </li>
                  </ul>
                  <p v-else class="px-4 py-5 sm:px-6 text-sm text-gray-500">No appointments booked yet.</p>
                </div>
              </div>
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
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore'
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

const fetchUsers = async () => {
  const usersCollection = collection(db, 'users')
  const userSnapshot = await getDocs(usersCollection)
  users.value = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
  userCounts.value = users.value.reduce((acc, user) => {
    acc[user.role]++
    return acc
  }, { students: 0, counselors: 0, administrators: 0 })
}

const fetchMoodData = async () => {
  try {
    // Simulated mood data (replace with actual Firebase query)
    const moodCounts = {
      'Happy': 30,
      'Sad': 15,
      'Stressed': 25,
      'Anxious': 18,
      'Neutral': 12
    }
    
    moodData.value = {
      labels: Object.keys(moodCounts),
      datasets: [{
        label: 'Mood Distribution',
        data: Object.values(moodCounts),
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336', '#9E9E9E']
      }]
    }
  } catch (error) {
    console.error('Error fetching mood data:', error)
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

const acceptAppointment = async (appointmentId) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status: 'accepted'
    })
    await fetchBookedAppointments() // Refresh the appointments list
  } catch (error) {
    console.error('Error accepting appointment:', error)
  }
}

const cancelAppointment = async (appointmentId) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId)
    await updateDoc(appointmentRef, {
      status: 'cancelled'
    })
    await fetchBookedAppointments() // Refresh the appointments list
  } catch (error) {
    console.error('Error cancelling appointment:', error)
  }
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    // Redirect to login page or handle logout
  } catch (error) {
    console.error('Logout failed', error)
  }
}

onMounted(() => {
  fetchUsers()
  fetchMoodData()
  fetchSnippetContent()
  fetchBookedAppointments()
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