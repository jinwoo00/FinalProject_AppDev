<template>
  <div class="manage-appointments-page">
    <Navbar :currentPage="'appointments'" />
    <div class="manage-appointments">
      <div class="appointment-section">
        <h4 class="section-header">Appointment History</h4>
        <div class="filter-buttons">
          <button 
            v-for="filter in historyFilters" 
            :key="filter"
            @click="setHistoryFilter(filter)"
            :class="['btn', currentHistoryFilter === filter ? 'btn-primary' : 'btn-secondary']"
          >
            {{ filter }}
          </button>
        </div>
        <div class="appointment-history">
          <div
            class="appointment-card"
            v-for="appointment in filteredHistoryAppointments"
            :key="appointment.id"
          >
            <h5>{{ appointment.studentName }}</h5>
            <p><strong>Date:</strong> {{ formatDate(appointment.dateTime) }}</p>
            <p><strong>Status:</strong> {{ appointment.status }}</p>
            <p v-if="appointment.notes"><strong>Notes:</strong> {{ appointment.notes }}</p>
            <button @click="editAppointment(appointment)" class="btn btn-primary mt-2">
              Edit
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Appointment Modal -->
      <div v-if="showAddAppointmentModal" class="modal">
        <div class="modal-content">
          <h4>{{ selectedAppointment ? 'Edit Appointment' : 'Add New Appointment' }}</h4>
          <form @submit.prevent="handleAppointmentSubmit">
            <div class="mb-4">
              <label for="studentName" class="block text-sm font-medium text-gray-700">Student Name</label>
              <input type="text" id="studentName" v-model="appointmentForm.studentName" required class="form-control">
            </div>
            <div class="mb-4">
              <label for="counselorName" class="block text-sm font-medium text-gray-700">Counselor Name</label>
              <input type="text" id="counselorName" v-model="appointmentForm.counselorName" required class="form-control">
            </div>
            <div class="mb-4">
              <label for="dateTime" class="block text-sm font-medium text-gray-700">Date & Time</label>
              <input type="datetime-local" id="dateTime" v-model="appointmentForm.dateTime" required class="form-control">
            </div>
            <div class="mb-4">
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <select id="status" v-model="appointmentForm.status" required class="form-control">
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
              <textarea id="notes" v-model="appointmentForm.notes" class="form-control"></textarea>
            </div>
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button type="submit" class="btn btn-primary">
                {{ selectedAppointment ? 'Update' : 'Add' }}
              </button>
              <button type="button" @click="closeAppointmentModal" class="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

export default {
  name: "ManageAppointment",
  components: {
    Navbar,
    Footer
  },
  setup() {
    const appointments = ref([
      { id: 1, studentName: "John Doe", dateTime: "2024-11-10T10:00", status: "Pending" },
      { id: 2, studentName: "Jane Smith", dateTime: "2024-11-11T14:00", status: "Accepted" },
      { id: 3, studentName: "Alice Johnson", dateTime: "2024-10-15T11:00", status: "Completed", notes: "Discussed project progress" },
      { id: 4, studentName: "Bob Brown", dateTime: "2024-10-20T15:30", status: "Cancelled", notes: "Student requested cancellation" },
      { id: 5, studentName: "Charlie Davis", dateTime: "2024-10-25T09:00", status: "Rescheduled", notes: "Rescheduled from 2024-10-22" },
    ])

    const showAddAppointmentModal = ref(false)
    const selectedAppointment = ref(null)
    const currentHistoryFilter = ref("All")
    const historyFilters = ["All", "Completed", "Cancelled", "Rescheduled"]

    const appointmentForm = ref({
      studentName: '',
      counselorName: '',
      dateTime: '',
      status: 'scheduled',
      notes: ''
    })

    const historyAppointments = computed(() => 
      appointments.value.filter((appointment) => 
        ["Completed", "Cancelled", "Rescheduled"].includes(appointment.status)
      )
    )

    const filteredHistoryAppointments = computed(() => 
      currentHistoryFilter.value === "All" 
        ? historyAppointments.value 
        : historyAppointments.value.filter(appointment => appointment.status === currentHistoryFilter.value)
    )

    const formatDate = (dateTime) => {
      return new Date(dateTime).toLocaleString()
    }

    const setHistoryFilter = (filter) => {
      currentHistoryFilter.value = filter
    }

    const editAppointment = (appointment) => {
      selectedAppointment.value = appointment
      appointmentForm.value = { ...appointment }
      showAddAppointmentModal.value = true
    }

    const closeAppointmentModal = () => {
      showAddAppointmentModal.value = false
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

    return {
      appointments,
      filteredHistoryAppointments,
      showAddAppointmentModal,
      selectedAppointment,
      currentHistoryFilter,
      historyFilters,
      appointmentForm,
      formatDate,
      setHistoryFilter,
      editAppointment,
      closeAppointmentModal,
      handleAppointmentSubmit
    }
  }
}
</script>

<style scoped>
.manage-appointments-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.manage-appointments {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.appointment-history {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  width: 100%;
}

.appointment-card {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.appointment-card h5 {
  margin-bottom: 8px;
}

.appointment-card p {
  margin: 4px 0;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.section-header {
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: bold;
}

.appointment-section {
  width: 100%;
  margin-bottom: 32px;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>