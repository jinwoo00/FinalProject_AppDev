<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore'

const db = getFirestore()
const auth = getAuth()

const notifications = ref([])
const appointments = ref([])

const fetchNotifications = async () => {
  const user = auth.currentUser
  if (user) {
    const notificationsCollection = collection(db, 'notifications')
    const q = query(
      notificationsCollection,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )
    const notificationsSnapshot = await getDocs(q)
    notifications.value = notificationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
}

const fetchAppointments = async () => {
  const user = auth.currentUser
  if (user) {
    const appointmentsCollection = collection(db, 'appointments')
    const q = query(
      appointmentsCollection,
      where('studentId', '==', user.uid),
      orderBy('dateTime', 'desc')
    )
    const appointmentsSnapshot = await getDocs(q)
    appointments.value = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
}

onMounted(() => {
  fetchNotifications()
  fetchAppointments()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">My Notifications</h1>
    <div v-if="notifications.length > 0" class="space-y-4">
      <div v-for="notification in notifications" :key="notification.id" class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-semibold">{{ notification.title }}</h2>
        <p class="text-gray-600">{{ notification.message }}</p>
        <p class="text-sm text-gray-500 mt-2">{{ new Date(notification.createdAt.toDate()).toLocaleString() }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500">No notifications</div>

    <h1 class="text-2xl font-bold mt-8 mb-4">My Appointments</h1>
    <div v-if="appointments.length > 0" class="space-y-4">
      <div v-for="appointment in appointments" :key="appointment.id" class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-semibold">Appointment with {{ appointment.counselorName }}</h2>
        <p class="text-gray-600">Date: {{ new Date(appointment.dateTime.toDate()).toLocaleString() }}</p>
        <p class="text-gray-600">Status: {{ appointment.status }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500">No appointments</div>
  </div>
</template>