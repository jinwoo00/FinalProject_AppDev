<template>
  <nav class="border-b bg-white no-underline">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo and main navigation -->
        <div class="flex items-center flex-grow">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="@/assets/munhi_logo.png" alt="MUNHI Logo">
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link 
                to="/Students" 
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline relative"
                active-class="text-gray-900 bg-gray-100"
              >
                Home
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path === '/Students' }"></div>
              </router-link>

              <!-- Appointments Dropdown -->
              <div class="relative">
                <button 
                  @click="toggleDropdown('appointments')" 
                  class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center no-underline relative"
                  :class="{ 'text-gray-900 bg-gray-100': dropdowns.appointments || $route.path.includes('/CounselingApp') || $route.path.includes('/ManageAppointment') }"
                >
                  <span>Appointments</span>
                  <svg class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path.includes('/CounselingApp') || $route.path.includes('/ManageAppointment') }"></div>
                </button>
                <transition name="fade">
                  <div v-if="dropdowns.appointments" class="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div class="py-1">
                      <router-link to="/CounselingApp" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Schedule Counseling</router-link>
                      <router-link to="/ManageAppointment" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">View History</router-link>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Mood Tracker Dropdown -->
              <div class="relative">
                <button 
                  @click="toggleDropdown('mood')" 
                  class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center no-underline relative"
                  :class="{ 'text-gray-900 bg-gray-100': dropdowns.mood || $route.path.includes('/MoodLogs') || $route.path.includes('/mood-journal') }"
                >
                  <span>Mood Tracker</span>
                  <svg class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path.includes('/MoodLogs') || $route.path.includes('/mood-journal') }"></div>
                </button>
                <transition name="fade">
                  <div v-if="dropdowns.mood" class="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div class="py-1">
                      <router-link to="/MoodLogs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Log Mood</router-link>
                      <router-link to="/mood-journal" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Mood Journal</router-link>
                    </div>
                  </div>
                </transition>
              </div>

             <router-link 
  to="/community" 
  class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline relative"
  active-class="text-gray-900 bg-gray-100"
>
  Community
  <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path === '/community' }"></div>
</router-link>
            </div>
          </div>
        </div>

        <!-- Right aligned icons -->
        <div class="flex items-center">
          <router-link to="/UserNotification" class="text-gray-400 hover:text-gray-500 p-2 no-underline">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </router-link>

          <router-link to="/EventCalendar" class="text-gray-400 hover:text-gray-500 p-2 no-underline">
            <span class="sr-only">View calendar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </router-link>

          <router-link to="/messages" class="text-gray-400 hover:text-gray-500 p-2 no-underline">
            <span class="sr-only">View messages</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </router-link>

          <div class="relative ml-3">
            <button @click="toggleDropdown('profile')" class="flex items-center no-underline">
              <img 
                class="h-8 w-8 rounded-full" 
                :src="userAvatar" 
                alt="User avatar"
              >
            </button>
            <transition name="fade">
              <div v-if="dropdowns.profile" class="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <div class="py-1">
                  <router-link to="/UserProf" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Your Profile</router-link>
                  <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Settings</router-link>
                  <router-link to="/help-support" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Help & Support</router-link>
                  <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Sign out</a>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button @click="toggleMobileMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 no-underline">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" :class="{'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="h-6 w-6" :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link 
          to="/students" 
          class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium no-underline relative"
          active-class="text-gray-900 bg-gray-100"
        >
          Home
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path === '/StudentsDashboard' }"></div>
        </router-link>
        <a @click="toggleMobileDropdown('appointments')" class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium cursor-pointer no-underline relative">
          Appointments
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path.includes('/CounselingApp') || $route.path.includes('/ManageAppointment') }"></div>
          <div v-if="mobileDropdowns.appointments" class="pl-4 mt-2 space-y-1">
            <router-link to="/CounselingApp" class="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 no-underline">Schedule Counseling</router-link>
            <router-link to="/ManageAppointment" class="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 no-underline">View History</router-link>
          </div>
        </a>
        <a @click="toggleMobileDropdown('mood')" class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium cursor-pointer no-underline relative">
          Mood Tracker
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path.includes('/MoodLogs') || $route.path.includes('/mood-journal') }"></div>
          <div v-if="mobileDropdowns.mood" class="pl-4 mt-2 space-y-1">
            <router-link to="/MoodLogs" class="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 no-underline">Log Mood</router-link>
            <router-link to="/mood-journal" class="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 no-underline">Mood Journal</router-link>
          </div>
        </a>
        <router-link 
          to="/community" 
          class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium no-underline relative"
          active-class="text-gray-900 bg-gray-100"
        >
          Community
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform duration-200 ease-in-out" :class="{ 'scale-x-100': $route.path === '/community' }"></div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'StudentNavbar',
  setup() {
    const router = useRouter()
    const dropdowns = ref({
      appointments: false,
      mood: false,
      profile: false
    })
    
    const mobileDropdowns = ref({
      appointments: false,
      mood: false
    })
    const mobileMenuOpen = ref(false)
    const userAvatar = ref('')

    const fetchUserAvatar = async (userId) => {
      try {
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists() && docSnap.data().profilePictureUrl) {
          userAvatar.value = docSnap.data().profilePictureUrl
        } else {
          userAvatar.value = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      } catch (error) {
        console.error('Error fetching user avatar:', error)
        userAvatar.value = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }

    const toggleDropdown = (dropdown) => {
      Object.keys(dropdowns.value).forEach(key => {
        if (key !== dropdown) dropdowns.value[key] = false
      })
      dropdowns.value[dropdown] = !dropdowns.value[dropdown]
    }

    const toggleMobileDropdown = (dropdown) => {
      mobileDropdowns.value[dropdown] = !mobileDropdowns.value[dropdown]
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const logout = () => {
      console.log('Logging out')
      // Implement logout logic here
      router.push('/login')
    }

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchUserAvatar(user.uid)
        }
      })

      

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative')) {
          Object.keys(dropdowns.value).forEach(key => {
            dropdowns.value[key] = false
          })
        }
      })
    })

    return {
      dropdowns,
      mobileDropdowns,
      mobileMenuOpen,
      userAvatar,
      toggleDropdown,
      toggleMobileDropdown,
      toggleMobileMenu,
      logout,
      fetchUserAvatar
    }
  }
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background: linear-gradient(to right, #ffffff, #f3f4f6);
}

.max-w-7xl {
  max-width: 1280px;
}

.h-12 {
  height: 3.5rem;
}

.flex-shrink-0 img {
  transition: transform 0.3s ease;
}

.flex-shrink-0 img:hover {
  transform: scale(1.1);
}

.text-gray-500 {
  color: #4b5563;
}

.text-gray-900 {
  color: #111827;
}

.hover\:text-gray-900:hover {
  color: #1f2937;
}

.px-3 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.no-underline {
  text-decoration: none;
}

.relative::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #6366f1;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.relative:hover::after {
  transform: scaleX(1);
}

.bg-gray-100 {
  background-color: rgba(243, 244, 246, 0.7);
}

.text-gray-400 {
  color: #9ca3af;
}

.hover\:text-gray-500:hover {
  color: #6b7280;
}

.h-6 {
  height: 1.6rem;
}

.w-6 {
  width: 1.6rem;
}

.rounded-full {
  border-radius: 9999px;
}

.ring-1 {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.ring-black {
  --tw-ring-color: rgba(0, 0, 0, 0.1);
}

.ring-opacity-5 {
  --tw-ring-opacity: 0.05;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition-transform {
  transition-property: transform;
}

.duration-200 {
  transition-duration: 200ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 768px) {
  .md\:block {
    display: block;
  }

  .md\:hidden {
    display: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile menu styles */
.md\:hidden .px-2 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.md\:hidden .pt-2 {
  padding-top: 0.75rem;
}

.md\:hidden .pb-3 {
  padding-bottom: 1rem;
}

.md\:hidden .space-y-1 > * + * {
  margin-top: 0.5rem;
}

.md\:hidden .hover\:bg-gray-100:hover {
  background-color: rgba(243, 244, 246, 0.8);
}

/* Dropdown menu styles */
.py-1 > * {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.hover\:bg-gray-100:hover {
  background-color: rgba(243, 244, 246, 0.8);
}
/* Enhanced Logo Styles */
.flex-shrink-0 {
  display: flex;
  align-items: center;
}

.flex-shrink-0 img {
  height: 3rem; /* Increased size */
  width: auto;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.flex-shrink-0 img:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.4)); /* Adds a subtle glow effect on hover */
}

/* Add a container for the logo and school name */
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Style for the school name */
.school-name {
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Adjust as needed */
}

@media (max-width: 768px) {
  .school-name {
    display: none; /* Hide school name on mobile */
  }
}

</style>