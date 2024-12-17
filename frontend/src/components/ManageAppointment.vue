<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Navbar :currentPage="'appointments'" />
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Manage Appointments</h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appointment History</h2>
        
        <!-- Updated filter buttons -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button 
            v-for="filter in historyFilters" 
            :key="filter"
            @click="setHistoryFilter(filter)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              currentHistoryFilter === filter 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            ]"
          >
            {{ filter }}
          </button>
        </div>

        <!-- Updated appointment list -->
        <div class="space-y-4">
          <div
            v-for="appointment in filteredHistoryAppointments"
            :key="appointment.id"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all hover:shadow-lg flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="flex-grow mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ appointment.studentName }}</h3>
              <div class="mt-2 space-y-1">
                <p class="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <CalendarIcon class="w-4 h-4 mr-2" />
                  {{ formatDate(appointment.dateTime) }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <TagIcon class="w-4 h-4 mr-2" />
                  {{ appointment.status }}
                </p>
                <p v-if="appointment.notes" class="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <ClipboardIcon class="w-4 h-4 mr-2" />
                  {{ truncateNotes(appointment.notes) }}
                </p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="editAppointment(appointment)" 
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center"
              >
                <PencilIcon class="w-4 h-4 mr-2" />
                Edit
              </button>
              <button 
                @click="deleteAppointment(appointment.id)" 
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center"
              >
                <TrashIcon class="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-6 flex justify-between items-center">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="text-gray-600 dark:text-gray-400">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <button 
        @click="openAddAppointmentModal" 
        class="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition-colors"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
    </main>

    <Footer />

    <!-- Add/Edit Appointment Modal -->
    <TransitionRoot appear :show="showAppointmentModal" as="template">
      <Dialog as="div" @close="closeAppointmentModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                  {{ selectedAppointment ? 'Edit Appointment' : 'Add New Appointment' }}
                </DialogTitle>
                <form @submit.prevent="handleAppointmentSubmit">
                  <div class="mb-4">
                    <label for="studentName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Name</label>
                    <input type="text" id="studentName" v-model="appointmentForm.studentName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                  <div class="mb-4">
                    <label for="counselorName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Counselor Name</label>
                    <input type="text" id="counselorName" v-model="appointmentForm.counselorName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                  <div class="mb-4">
                    <label for="dateTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date & Time</label>
                    <input type="datetime-local" id="dateTime" v-model="appointmentForm.dateTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                  <div class="mb-4">
                    <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select id="status" v-model="appointmentForm.status" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                    <textarea id="notes" v-model="appointmentForm.notes" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                  </div>
                  <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" @click="closeAppointmentModal" class="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Cancel
                    </button>
                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      {{ selectedAppointment ? 'Update' : 'Add' }}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CalendarIcon, TagIcon, ClipboardIcon, PlusIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

const appointments = ref([
  { id: 1, studentName: "John Doe", dateTime: "2024-11-10T10:00", status: "Pending" },
  { id: 2, studentName: "Jane Smith", dateTime: "2024-11-11T14:00", status: "Accepted" },
  { id: 3, studentName: "Alice Johnson", dateTime: "2024-10-15T11:00", status: "Completed", notes: "Discussed project progress" },
  { id: 4, studentName: "Bob Brown", dateTime: "2024-10-20T15:30", status: "Cancelled", notes: "Student requested cancellation" },
  { id: 5, studentName: "Charlie Davis", dateTime: "2024-10-25T09:00", status: "Rescheduled", notes: "Rescheduled from 2024-10-22" },
  // Add more appointments for pagination demo
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    studentName: `Student ${i + 6}`,
    dateTime: `2024-11-${i + 1}T09:00`,
    status: ["Pending", "Accepted", "Completed", "Cancelled", "Rescheduled"][Math.floor(Math.random() * 5)],
    notes: `Notes for appointment ${i + 6}`
  }))
])

const showAppointmentModal = ref(false)
const selectedAppointment = ref(null)
const currentHistoryFilter = ref("All")
const historyFilters = ["All", "Pending", "Accepted", "Completed", "Cancelled", "Rescheduled"]

const appointmentForm = ref({
  studentName: '',
  counselorName: '',
  dateTime: '',
  status: 'scheduled',
  notes: ''
})

// Pagination
const itemsPerPage = 5
const currentPage = ref(1)

const historyAppointments = computed(() => 
  appointments.value.filter((appointment) => 
    currentHistoryFilter.value === "All" || appointment.status === currentHistoryFilter.value
  )
)

const filteredHistoryAppointments = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return historyAppointments.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(historyAppointments.value.length / itemsPerPage))

const formatDate = (dateTime) => {
  return new Date(dateTime).toLocaleString()
}

const truncateNotes = (notes, maxLength = 50) => {
  return notes.length > maxLength ? notes.substring(0, maxLength) + '...' : notes
}

const setHistoryFilter = (filter) => {
  currentHistoryFilter.value = filter
  currentPage.value = 1 // Reset to first page when changing filter
}

const editAppointment = (appointment) => {
  selectedAppointment.value = appointment
  appointmentForm.value = { ...appointment }
  showAppointmentModal.value = true
}

const deleteAppointment = (id) => {
  if (confirm('Are you sure you want to delete this appointment?')) {
    appointments.value = appointments.value.filter(appointment => appointment.id !== id)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const closeAppointmentModal = () => {
  showAppointmentModal.value = false
  selectedAppointment.value = null
  appointmentForm.value = {
    studentName: '',
    counselorName: '',
    dateTime: '',
    status: 'scheduled',
    notes: ''
  }
}

const handleAppointmentSubmit = () => {
  if (selectedAppointment.value) {
    const index = appointments.value.findIndex(a => a.id === selectedAppointment.value.id)
    if (index !== -1) {
      appointments.value[index] = { ...appointmentForm.value, id: selectedAppointment.value.id }
    }
  } else {
    appointments.value.push({
      ...appointmentForm.value,
      id: appointments.value.length + 1
    })
  }
  closeAppointmentModal()
}
</script>

