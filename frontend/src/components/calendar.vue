<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <Navbar :currentPage="'calendar'" />
      <div class="flex-grow container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">My Calendar</h1>
        <div class="bg-white shadow rounded-lg p-6">
          <v-calendar
            :attributes="calendarAttributes"
            :theme-styles="themeStyles"
            :first-day-of-week="1"
            @dayclick="onDayClick"
            class="custom-calendar"
          />
        </div>
        
        <!-- Event Modal -->
        <div v-if="selectedDate" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="event-modal">
          <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Events on {{ formatDate(selectedDate) }}</h3>
              <div class="mt-2 px-7 py-3">
                <ul class="text-sm text-gray-500">
                  <li v-for="event in eventsOnSelectedDate" :key="event.id" class="mb-2">
                    {{ event.title }} - {{ formatTime(event.startTime) }}
                  </li>
                </ul>
                <p v-if="eventsOnSelectedDate.length === 0">No events scheduled for this day.</p>
              </div>
              <div class="items-center px-4 py-3">
                <button
                  id="close-modal"
                  @click="selectedDate = null"
                  class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { collection, query, where, getDocs } from 'firebase/firestore'
  import { db, auth } from './firebaseConfig'
  import Navbar from './Navbar.vue'
  import Footer from './Footer.vue'
  
  const events = ref([])
  const selectedDate = ref(null)
  
  const themeStyles = {
    wrapper: {
      backgroundColor: 'var(--vc-bg-primary)',
      borderRadius: '0.5rem',
    },
    dayContent: {
      fontWeight: '700',
    },
  }
  
  const fetchEvents = async () => {
    const user = auth.currentUser
    if (!user) return
  
    const eventsRef = collection(db, 'events')
    const q = query(eventsRef, where('userId', '==', user.uid))
    const querySnapshot = await getDocs(q)
    events.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: new Date(doc.data().date.seconds * 1000),
      startTime: new Date(doc.data().startTime.seconds * 1000),
    }))
  }
  
  onMounted(fetchEvents)
  
  const calendarAttributes = computed(() => {
    return events.value.map(event => ({
      dates: event.date,
      dot: {
        color: 'blue',
        class: 'opacity-75',
      },
      popover: {
        label: event.title,
      },
    }))
  })
  
  const onDayClick = (day) => {
    selectedDate.value = day.date
  }
  
  const eventsOnSelectedDate = computed(() => {
    if (!selectedDate.value) return []
    return events.value.filter(event => 
      event.date.toDateString() === selectedDate.value.toDateString()
    )
  })
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  </script>
  
  <style>
  @import 'v-calendar/dist/style.css';
  
  .custom-calendar {
    --vc-bg-primary: #ffffff;
    --vc-border-radius: 0.5rem;
    --vc-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  .custom-calendar .vc-header {
    padding: 10px 0;
  }
  
  .custom-calendar .vc-weeks {
    padding: 0 10px 10px;
  }
  
  .custom-calendar .vc-day {
    padding: 5px;
  }
  
  .custom-calendar .vc-day-content {
    font-weight: 600;
  }
  
  .custom-calendar .vc-day-content:hover {
    background-color: #f3f4f6;
    border-radius: 50%;
  }
  </style>