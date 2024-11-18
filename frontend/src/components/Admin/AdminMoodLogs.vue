<template>
    <div class="flex flex-col min-h-screen">
      <Navbar :currentPage="'admin-mood-logs'" />
      <div class="flex-grow bg-gray-100 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Admin Mood Logs</h1>
          
          <!-- Mood Logs Table -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mood</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="log in moodLogs" :key="log.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col">
                      <div class="text-sm font-medium text-gray-900">
                        {{ log.studentName }}
                      </div>
                      <div class="text-sm text-gray-500">{{ log.userEmail }}</div>
                      <div v-if="log.grade" class="text-xs text-gray-400">
                        Grade: {{ log.grade }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-2xl">{{ getMoodEmoji(log.rating) }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ log.note }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(log.timestamp) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { collection, query, getDocs, orderBy, } from 'firebase/firestore'
  import { onAuthStateChanged } from 'firebase/auth'
  import { db, auth } from '@/firebaseConfig'
  import Navbar from '../Navbar.vue'
  import Footer from '../Footer.vue'
  
  const moodLogs = ref([])
  const currentUser = ref(null)
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser.value = user
        fetchAllMoodLogs()
      } else {
        currentUser.value = null
        moodLogs.value = []
      }
    })
  })
  
  const fetchAllMoodLogs = async () => {
    if (!currentUser.value) return
  
    if (!currentUser.value.email.endsWith('@admin.com')) {
      alert('You do not have permission to view this page.')
      return
    }
  
    try {
      // First fetch all users to create a lookup map
      const usersRef = collection(db, 'users')
      const usersSnapshot = await getDocs(usersRef)
      const userMap = {}
      usersSnapshot.forEach(doc => {
        const userData = doc.data()
        userMap[userData.email] = userData.name || userData.firstName + ' ' + userData.lastName || userData.displayName
      })
  
      // Then fetch and map mood logs
      const moodLogsRef = collection(db, 'moodLogs')
      const q = query(moodLogsRef, orderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      
      moodLogs.value = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          studentName: userMap[data.userEmail] || data.userName || 'Anonymous'
        }
      })
    } catch (error) {
      console.error('Error fetching mood logs:', error)
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
  </script>