<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
    <Navbar :currentPage="'mood-tracker'" />
    <div class="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-extrabold text-indigo-900 mb-8 text-center">Mood Tracker</h1>
        
        <!-- Mood Input Form -->
        <div class="bg-white shadow-lg rounded-2xl p-8 mb-8 transform transition-all hover:scale-105">
          <h2 class="text-2xl font-semibold mb-6 text-indigo-800">Log Your Mood</h2>
          <form @submit.prevent="logMood" class="space-y-6">
            <div>
              <label for="moodRating" class="block text-sm font-medium text-gray-700 mb-2">How are you feeling today?</label>
              <select
                id="moodRating"
                v-model="newMood.rating"
                required
                class="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg transition-colors duration-200"
              >
                <option value="" disabled>Select your mood</option>
                <option value="5">😄 Great</option>
                <option value="4">🙂 Good</option>
                <option value="3">😐 Okay</option>
                <option value="2">🙁 Not so good</option>
                <option value="1">😞 Terrible</option>
              </select>
            </div>
            <div>
              <label for="moodNote" class="block text-sm font-medium text-gray-700 mb-2">Reflect on your day (optional)</label>
              <textarea
                id="moodNote"
                v-model="newMood.note"
                rows="4"
                class="block w-full shadow-sm sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-lg transition-colors duration-200"
                placeholder="Add any thoughts, feelings, or experiences..."
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <span class="mr-2">Log Mood</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <!-- Mood History -->
        <div class="bg-white shadow-lg rounded-2xl p-8">
          <h2 class="text-2xl font-semibold mb-6 text-indigo-800">Your Mood Journey</h2>
          <div v-if="moodLogs.length === 0" class="text-gray-500 text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p class="text-lg">Your mood journey starts here. Log your first mood above!</p>
          </div>
          <ul v-else class="space-y-6">
            <li v-for="log in moodLogs" :key="log.id" class="bg-gray-50 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <span class="text-4xl mr-3">{{ getMoodEmoji(log.rating) }}</span>
                  <div>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(log.timestamp) }}</span>
                    <p class="text-sm text-gray-500">{{ getDayOfWeek(log.timestamp) }}</p>
                  </div>
                </div>
                <button
                  @click="deleteMoodLog(log.id)"
                  class="text-red-600 hover:text-red-800 focus:outline-none transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <p v-if="log.note" class="text-gray-700 bg-white rounded-lg p-4 shadow-inner">{{ log.note }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebaseConfig'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

const newMood = ref({ rating: '', note: '' })
const moodLogs = ref([])
const currentUser = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      fetchMoodLogs()
    } else {
      currentUser.value = null
      moodLogs.value = []
    }
  })
})

const fetchMoodLogs = async () => {
  if (!currentUser.value) return

  const moodLogsRef = collection(db, 'moodLogs')
  const q = query(moodLogsRef, where('userId', '==', currentUser.value.uid))

  try {
    const querySnapshot = await getDocs(q)
    moodLogs.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error('Error fetching mood logs:', error)
  }
}

const logMood = async () => {
  if (!currentUser.value) {
    alert('Please log in to record your mood.')
    return
  }

  try {
    const moodLogsRef = collection(db, 'moodLogs')
    const newLog = {
      userId: currentUser.value.uid,
      userEmail: currentUser.value.email,
      userName: currentUser.value.displayName || 'Anonymous',
      rating: parseInt(newMood.value.rating),
      note: newMood.value.note,
      timestamp: serverTimestamp()
    }

    await addDoc(moodLogsRef, newLog)
    
    alert('Mood logged successfully!')
    
    // Reset form
    newMood.value = { rating: '', note: '' }

    // Refresh mood logs
    await fetchMoodLogs()
  } catch (error) {
    console.error('Error logging mood:', error)
    alert('Failed to log mood. Please try again.')
  }
}

const deleteMoodLog = async (logId) => {
  if (!confirm('Are you sure you want to delete this mood log?')) return

  try {
    await deleteDoc(doc(db, 'moodLogs', logId))
    alert('Mood log deleted successfully!')
    await fetchMoodLogs()
  } catch (error) {
    console.error('Error deleting mood log:', error)
    alert('Failed to delete mood log. Please try again.')
  }
}

const getMoodEmoji = (rating) => {
  const emojis = ['😞', '🙁', '😐', '🙂', '😄']
  return emojis[rating - 1] || '❓'
}

const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  return 'Date not available'
}

const getDayOfWeek = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleString(undefined, { weekday: 'long' })
  }
  return ''
}
</script>

<style scoped>
/* Add any additional component-specific styles here */
</style>