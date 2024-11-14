<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
    <button @click="goBack" class="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
      &larr; Back
    </button>
    <h1 class="text-3xl font-bold mb-8 text-center text-primary">Book a Counseling Appointment</h1>

    <!-- Appointment Booking Form -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Book Your Appointment</h2>
      <form @submit.prevent="bookAppointment" class="space-y-4">
        <div>
          <label for="appointmentDate" class="block text-sm font-medium text-gray-700">Date</label>
          <input 
            id="appointmentDate" 
            v-model="appointmentDate" 
            type="date" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="appointmentTime" class="block text-sm font-medium text-gray-700">Time</label>
          <input 
            id="appointmentTime" 
            v-model="appointmentTime" 
            type="time" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="counselorName" class="block text-sm font-medium text-gray-700">Counselor Name</label>
          <input 
            id="counselorName" 
            v-model="counselorName" 
            type="text" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="studentName" class="block text-sm font-medium text-gray-700">Your Name</label>
          <input 
            id="studentName" 
            v-model="studentName" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="studentEmail" class="block text-sm font-medium text-gray-700">Your Email</label>
          <input 
            id="studentEmail" 
            v-model="studentEmail" 
            type="email" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="studentPhone" class="block text-sm font-medium text-gray-700">Your Phone</label>
          <input 
            id="studentPhone" 
            v-model="studentPhone" 
            type="tel" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="appointmentReason" class="block text-sm font-medium text-gray-700">Reason for Appointment</label>
          <textarea 
            id="appointmentReason" 
            v-model="appointmentReason" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button 
            type="submit" 
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300"
            :disabled="isBooking"
          >
            {{ isBooking ? 'Booking...' : 'Book Appointment' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Booked Appointments -->
    <div v-if="bookedAppointments.length > 0" class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Your Booked Appointments</h2>
      <ul class="space-y-4">
        <li v-for="appointment in bookedAppointments" :key="appointment.id" class="bg-gray-50 p-4 rounded-md">
          <p><strong>Date:</strong> {{ appointment.date }}</p>
          <p><strong>Time:</strong> {{ appointment.time }}</p>
          <p><strong>Counselor:</strong> {{ appointment.counselor }}</p>
          <p><strong>Reason:</strong> {{ appointment.reason }}</p>
          <p><strong>Status:</strong> {{ appointment.status }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyDSUFCnlMEvz5bG0M5pVVccgsOr0MB6uMY",
  authDomain: "naujanmunicipalhigh-school.firebaseapp.com",
  projectId: "naujanmunicipalhigh-school",
  storageBucket: "naujanmunicipalhigh-school.firebasestorage.app",
  messagingSenderId: "680818173352",
  appId: "1:680818173352:web:88f19e93b1de7f3250299d",
  measurementId: "G-3E5MF7JQ3T"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const appointmentDate = ref('')
const appointmentTime = ref('')
const counselorName = ref('')
const studentName = ref('')
const studentEmail = ref('')
const studentPhone = ref('')
const appointmentReason = ref('')
const isBooking = ref(false)
const bookedAppointments = ref([])
const currentUser = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      fetchBookedAppointments()
    } else {
      currentUser.value = null
      bookedAppointments.value = []
    }
  })
})

const fetchBookedAppointments = async () => {
  if (!currentUser.value) return

  const appointmentsRef = collection(db, 'appointments')
  const q = query(appointmentsRef, where('studentEmail', '==', currentUser.value.email))
  
  try {
    const querySnapshot = await getDocs(q)
    bookedAppointments.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching booked appointments:', error)
  }
}

const bookAppointment = async () => {
  if (!currentUser.value) {
    alert('Please log in to book an appointment.')
    return
  }

  isBooking.value = true
  try {
    const appointmentsRef = collection(db, 'appointments')
    const newAppointment = {
      date: appointmentDate.value,
      time: appointmentTime.value,
      counselor: counselorName.value,
      studentName: studentName.value,
      studentEmail: studentEmail.value,
      studentPhone: studentPhone.value,
      reason: appointmentReason.value,
      status: 'pending',
      createdAt: new Date()
    }
    
    await addDoc(appointmentsRef, newAppointment)
    
    alert('Appointment booked successfully!')
    
    // Reset form fields
    appointmentDate.value = ''
    appointmentTime.value = ''
    counselorName.value = ''
    studentName.value = ''
    studentEmail.value = ''
    studentPhone.value = ''
    appointmentReason.value = ''

    // Refresh booked appointments
    await fetchBookedAppointments()
  } catch (error) {
    console.error("Error booking appointment: ", error)
    alert("Failed to book appointment. Please try again.")
  } finally {
    isBooking.value = false
  }
}

const goBack = () => {
  window.history.back()
}
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