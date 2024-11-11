<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
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
})
</script>

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