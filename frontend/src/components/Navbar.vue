<template>
  <nav class="border-b bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="flex h-16 items-center justify-between px-4">
        <!-- Left section -->
        <div class="flex items-center space-x-8">
          <div class="flex items-center space-x-3">
            <img class="h-8 w-8" src="@/assets/munhi_logo.png" alt="MUNHI Logo">
            <span class="text-lg font-semibold text-gray-900">MUNHI</span>
          </div>
          <router-link 
            to="/AdminDashboard" 
            class="text-gray-500 hover:text-gray-900 text-sm font-medium"
            active-class="text-gray-900"
          >
            Dashboard
          </router-link>
        </div>

        <!-- Center section -->
        <div class="flex items-center space-x-8">
          <!-- Appointments Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown('appointments')" 
              class="flex items-center space-x-1 text-gray-500 hover:text-gray-900 text-sm font-medium"
              :class="{ 'text-gray-900': dropdowns.appointments }"
            >
              <span>Appointments</span>
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <transition name="fade">
              <div v-if="dropdowns.appointments" class="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div class="py-1">
                  <router-link to="/CounselingApp" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Schedule Counseling</router-link>
                  <router-link to="/appointments/history" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View History</router-link>
                </div>
              </div>
            </transition>
          </div>

          <!-- Mood Tracker Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown('mood')" 
              class="flex items-center space-x-1 text-gray-500 hover:text-gray-900 text-sm font-medium"
              :class="{ 'text-gray-900': dropdowns.mood }"
            >
              <span>Mood Tracker</span>
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <transition name="fade">
              <div v-if="dropdowns.mood" class="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div class="py-1">
                  <router-link to="/mood/log" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Mood</router-link>
                  <router-link to="/mood/analytics" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Analytics</router-link>
                  <router-link to="/mood/journal" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mood Journal</router-link>
                </div>
              </div>
            </transition>
          </div>

          <router-link 
            to="/wellbeing" 
            class="text-gray-500 hover:text-gray-900 text-sm font-medium"
            active-class="text-gray-900"
          >
            Well-being Tools
          </router-link>

          <router-link 
            to="/community" 
            class="text-gray-500 hover:text-gray-900 text-sm font-medium"
            active-class="text-gray-900"
          >
            Community
          </router-link>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-6">
          <button class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <button class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">View calendar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <button class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">View messages</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>

          <div class="relative">
            <button @click="toggleDropdown('profile')" class="flex items-center">
              <img 
                class="h-8 w-8 rounded-full" 
                :src="userAvatar" 
                alt="User avatar"
              >
            </button>
            <transition name="fade">
              <div v-if="dropdowns.profile" class="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div class="py-1">
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</router-link>
                  <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</router-link>
                  <router-link to="/help" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help & Support</router-link>
                  <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'StudentNavbar',
  data() {
    return {
      dropdowns: {
        appointments: false,
        mood: false,
        profile: false
      },
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  },
  methods: {
    toggleDropdown(dropdown) {
      // Close other dropdowns
      Object.keys(this.dropdowns).forEach(key => {
        if (key !== dropdown) this.dropdowns[key] = false
      })
      // Toggle the clicked dropdown
      this.dropdowns[dropdown] = !this.dropdowns[dropdown]
    },
    logout() {
      console.log('Logging out')
      // Implement logout logic
    }
  },
  mounted() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        Object.keys(this.dropdowns).forEach(key => {
          this.dropdowns[key] = false
        })
      }
    })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>