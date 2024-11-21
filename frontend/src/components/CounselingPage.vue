<template>
  <div class="flex flex-col min-h-screen">
    <Navbar :currentPage="'appointments'" />
    <div class="flex-grow">
      <div class="max-w-4xl mx-auto p-8 bg-gray-50">
        <h1 class="text-3xl font-bold mb-8 text-center text-primary">Make an Appointment</h1>

        <!-- Appointment Booking Form -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Fill Up the Form</h2>
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
                {{ isBooking ? 'Booking...' : 'Add Counseling' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Booked Appointments -->
        <div v-if="bookedAppointments.length > 0" class="bg-white rounded-lg shadow-lg p-8">
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
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Import Vue Router
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

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

// State variables
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

// Router instance
const router = useRouter()

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
    alert('Unable to fetch booked appointments. Please try again later.')
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

    // Redirect to Appointment Management
    router.push('/appointment-management')
  } catch (error) {
    console.error("Error booking appointment: ", error)
    alert("Failed to book appointment. Please try again.")
  } finally {
    isBooking.value = false
  }
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