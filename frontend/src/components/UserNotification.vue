<template>
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-auto">
              <div class="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="notification in notifications" :key="notification.id">
                    <a href="#" class="block hover:bg-gray-50">
                      <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                          <p class="text-sm font-medium text-indigo-600 truncate">
                            {{ notification.title }}
                          </p>
                          <div class="ml-2 flex-shrink-0 flex">
                            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {{ notification.status }}
                            </p>
                          </div>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                          <div class="sm:flex">
                            <p class="flex items-center text-sm text-gray-500">
                              <CreditCardIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {{ notification.amount }}
                            </p>
                            <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <UserIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {{ notification.recipient }}
                            </p>
                          </div>
                          <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <ClockIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>
                              Completed on <time :datetime="notification.completedAt">{{ formatDate(notification.completedAt) }}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { CreditCardIcon, UserIcon, ClockIcon } from 'lucide-vue-next'
  
  // Mock data for notifications
  const notifications = ref([
    {
      id: 1,
      title: 'Payment to John Doe',
      status: 'Completed',
      amount: '$500.00',
      recipient: 'John Doe',
      completedAt: '2023-04-15T13:45:30'
    },
    {
      id: 2,
      title: 'Subscription Renewal',
      status: 'Completed',
      amount: '$19.99',
      recipient: 'Netflix',
      completedAt: '2023-04-14T09:30:00'
    },
    {
      id: 3,
      title: 'Online Purchase',
      status: 'Completed',
      amount: '$75.50',
      recipient: 'Amazon',
      completedAt: '2023-04-13T16:20:15'
    },
    {
      id: 4,
      title: 'Salary Deposit',
      status: 'Completed',
      amount: '$3,500.00',
      recipient: 'Your Account',
      completedAt: '2023-04-01T00:05:00'
    },
    {
      id: 5,
      title: 'Utility Bill Payment',
      status: 'Completed',
      amount: '$120.75',
      recipient: 'Electric Company',
      completedAt: '2023-03-28T11:15:45'
    }
  ])
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  </script>