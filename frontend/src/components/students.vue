<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <GraduationCapIcon class="h-8 w-8 text-indigo-600" />
              <span class="ml-2 text-xl font-bold text-gray-800">StudentPortal</span>
            </div>
          </div>
          <div class="flex items-center">
            <button class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <BellIcon class="h-6 w-6" />
            </button>
            <img class="ml-4 h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="User avatar" />
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Welcome, {{ student.name }}</h1>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Upcoming Classes -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <CalendarIcon class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Upcoming Classes
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ upcomingClasses.length }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </a>
              </div>
            </div>
          </div>

          <!-- Assignments Due -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <ClipboardIcon class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Assignments Due
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ assignmentsDue.length }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </a>
              </div>
            </div>
          </div>

          <!-- GPA -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <ChartBarIcon class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Current GPA
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900">
                        {{ student.gpa }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  View details
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Announcements -->
        <div class="mt-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Announcements</h2>
          <ul class="divide-y divide-gray-200">
            <li v-for="announcement in recentAnnouncements" :key="announcement.id" class="py-4">
              <div class="flex space-x-3">
                <MegaphoneIcon class="h-6 w-6 text-gray-400" />
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium">{{ announcement.title }}</h3>
                    <p class="text-sm text-gray-500">{{ announcement.date }}</p>
                  </div>
                  <p class="text-sm text-gray-500">{{ announcement.content }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div class="mt-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Links</h2>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <a v-for="link in quickLinks" :key="link.name" :href="link.href" class="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <component :is="link.icon" class="h-6 w-6 text-indigo-600" />
              <span class="ml-3 text-sm font-medium text-gray-900">{{ link.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  GraduationCapIcon, 
  BellIcon, 
  CalendarIcon, 
  ClipboardIcon, 
  ChartBarIcon,
  MegaphoneIcon,
  BookOpenIcon,
  CreditCardIcon,
  UserIcon,
  LibraryIcon
} from 'lucide-vue-next';

// Mock data
const student = ref({
  name: 'John Doe',
  gpa: 3.75
});

const upcomingClasses = ref([
  { id: 1, name: 'Mathematics 101', time: '09:00 AM' },
  { id: 2, name: 'History 202', time: '11:00 AM' },
  { id: 3, name: 'Physics 301', time: '02:00 PM' }
]);

const assignmentsDue = ref([
  { id: 1, name: 'Math Homework', dueDate: '2023-06-15' },
  { id: 2, name: 'History Essay', dueDate: '2023-06-18' }
]);

const recentAnnouncements = ref([
  { id: 1, title: 'Campus Event', date: '2023-06-10', content: 'Join us for the annual campus festival next week!' },
  { id: 2, title: 'Library Hours Extended', date: '2023-06-08', content: 'The library will now be open until midnight during exam week.' }
]);

const quickLinks = ref([
  { name: 'Course Catalog', href: '#', icon: BookOpenIcon },
  { name: 'Tuition Payment', href: '#', icon: CreditCardIcon },
  { name: 'Student Profile', href: '#', icon: UserIcon },
  { name: 'Library Resources', href: '#', icon: LibraryIcon }
]);
</script>