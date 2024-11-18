<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore()

const users = ref([])
const userCounts = ref({
  students: 0,
  counselors: 0,
  administrators: 0
})

const activeTab = ref('users')

const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, 'users')
    const userSnapshot = await getDocs(usersCollection)
    
    // Reset counts
    userCounts.value = {
      students: 0,
      counselors: 0,
      administrators: 0
    }
    
    // Map users and count roles
    users.value = userSnapshot.docs.map(doc => {
      const userData = { id: doc.id, ...doc.data() }
      
      // Convert role to lowercase and handle potential undefined roles
      const role = (userData.role || '').toLowerCase()
      
      // Increment counter based on role
      if (role === 'student') {
        userCounts.value.students++
      } else if (role === 'counselor') {
        userCounts.value.counselors++
      } else if (role === 'administrator') {
        userCounts.value.administrators++
      }
      
      return userData
    })
    
    console.log('User counts:', userCounts.value) // Debug log
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <!-- Navigation content remains the same -->
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
                <!-- Total Students Card -->
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

                <!-- Total Counselors Card -->
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

                <!-- Total Administrators Card -->
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

              <!-- Users Table -->
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in users" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
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
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

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