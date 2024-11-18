<template>
  <div class="flex flex-col min-h-screen">
    <Navbar :currentPage="'mood-tracker'" />
    <div class="flex-grow bg-gray-100 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Mood Tracker</h1>
        
        <!-- Mood Input Form -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4">Log Your Mood</h2>
          <form @submit.prevent="logMood" class="space-y-4">
            <div>
              <label for="moodRating" class="block text-sm font-medium text-gray-700">How are you feeling?</label>
              <select
                id="moodRating"
                v-model="newMood.rating"
                required
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
              <label for="moodNote" class="block text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea
                id="moodNote"
                v-model="newMood.note"
                rows="3"
                class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                placeholder="Add any thoughts or reflections..."
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log Mood
              </button>
            </div>
          </form>
        </div>

        <!-- Mood History -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Your Mood History</h2>
          <div v-if="moodLogs.length === 0" class="text-gray-500 text-center py-4">
            No mood logs yet. Start tracking your mood above!
          </div>
          <ul v-else class="space-y-4">
            <li v-for="log in moodLogs" :key="log.id" class="border-b border-gray-200 pb-4 last:border-b-0">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl mr-2">{{ getMoodEmoji(log.rating) }}</span>
                  <span class="text-sm text-gray-500">{{ formatDate(log.timestamp) }}</span>
                </div>
                <button
                  @click="deleteMoodLog(log.id)"
                  class="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Delete
                </button>
              </div>
              <p v-if="log.note" class="mt-2 text-gray-700">{{ log.note }}</p>
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
    return new Date(timestamp.seconds * 1000).toLocaleString()
  }
  return 'Date not available'
}
</script>