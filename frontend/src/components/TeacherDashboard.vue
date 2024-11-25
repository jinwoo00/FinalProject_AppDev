<template>
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center mb-4">
                  <UserIcon class="h-6 w-6 text-gray-400 mr-2" />
                  <h2 class="text-lg font-medium text-gray-900">Teacher Information</h2>
                </div>
                <p class="text-sm text-gray-500">{{ teacherInfo.name }}</p>
              </div>
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center mb-4">
                  <BookOpenIcon class="h-6 w-6 text-gray-400 mr-2" />
                  <h2 class="text-lg font-medium text-gray-900">Current Subject</h2>
                </div>
                <p class="text-sm text-gray-500">{{ subject }}</p>
              </div>
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center mb-4">
                  <UsersIcon class="h-6 w-6 text-gray-400 mr-2" />
                  <h2 class="text-lg font-medium text-gray-900">Students in Class</h2>
                </div>
                <ul class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <li v-for="student in students" :key="student.id" class="col-span-1 flex shadow-sm rounded-md">
                    <div class="flex-shrink-0 flex items-center justify-center w-16 bg-purple-600 text-white text-sm font-medium rounded-l-md">
                      {{ student.initials }}
                    </div>
                    <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div class="flex-1 px-4 py-2 text-sm truncate">
                        <p class="text-gray-900 font-medium hover:text-gray-600">
                          {{ student.name }}
                        </p>
                        <p class="text-gray-500">ID: {{ student.id }}</p>
                      </div>
                    </div>
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
  import { UserIcon, BookOpenIcon, UsersIcon } from 'lucide-vue-next'
  
  const teacherInfo = ref({
    name: 'John Doe',
    id: 'T001'
  })
  
  const subject = ref('Mathematics')
  
  const students = ref([
    { id: 'S001', name: 'Alice Johnson', initials: 'AJ' },
    { id: 'S002', name: 'Bob Smith', initials: 'BS' },
    { id: 'S003', name: 'Charlie Brown', initials: 'CB' },
    { id: 'S004', name: 'Diana Ross', initials: 'DR' },
    { id: 'S005', name: 'Ethan Hunt', initials: 'EH' },
    { id: 'S006', name: 'Fiona Apple', initials: 'FA' },
  ])
  </script>