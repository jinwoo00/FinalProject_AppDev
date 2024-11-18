<template>
  <div class="manage-appointments-page">
    <Navbar :currentPage="'appointments'" />
    <div class="manage-appointments">
      <h3>Manage Appointments</h3>
  
      <!-- Appointment Requests Column -->
      <div class="appointment-requests">
        <h4>Appointment Requests</h4>
        <div
          class="appointment-card"
          v-for="appointment in pendingAppointments"
          :key="appointment.id"
        >
          <h5>{{ appointment.studentName }}</h5>
          <p><strong>Date:</strong> {{ appointment.date }}</p>
          <p><strong>Status:</strong> {{ appointment.status }}</p>
  
          <!-- Approve Button -->
          <button class="btn btn-primary" @click="approveAppointment(appointment)">
            Approve
          </button>
  
          <!-- Reject Button -->
          <button class="btn btn-danger" @click="rejectAppointment(appointment)">
            Reject
          </button>
        </div>
      </div>
  
      <!-- Manage Appointments Column -->
      <div class="appointment-cards">
        <h4>Scheduled Appointments</h4>
        <div
          class="appointment-card"
          v-for="appointment in scheduledAppointments"
          :key="appointment.id"
        >
          <h5>{{ appointment.studentName }}</h5>
          <p><strong>Date:</strong> {{ appointment.date }}</p>
          <p><strong>Status:</strong> {{ appointment.status }}</p>
  
          <!-- Reschedule Button -->
          <button class="btn btn-warning" @click="openRescheduleModal(appointment)">
            Reschedule
          </button>
  
          <!-- Cancel Button -->
          <button class="btn btn-danger" @click="cancelAppointment(appointment)">
            Cancel
          </button>
        </div>
      </div>
  
      <!-- Reschedule Modal -->
      <div v-if="isRescheduleModalOpen" class="modal">
        <div class="modal-content">
          <h4>Reschedule Appointment</h4>
          <input
            type="date"
            v-model="rescheduleDate"
            class="form-control"
            placeholder="Select new date"
          />
          <button class="btn btn-primary mt-2" @click="confirmReschedule">
            Confirm Reschedule
          </button>
          <button class="btn btn-secondary mt-2" @click="closeRescheduleModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

export default {
  name: "ManageAppointment",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      appointments: [
        { id: 1, studentName: "John Doe", date: "2024-11-10", status: "Pending" },
        { id: 2, studentName: "Jane Smith", date: "2024-11-11", status: "Accepted" },
      ],
      isRescheduleModalOpen: false,
      selectedAppointment: null,
      rescheduleDate: "",
    };
  },
  computed: {
    pendingAppointments() {
      return this.appointments.filter((appointment) => appointment.status === "Pending");
    },
    scheduledAppointments() {
      return this.appointments.filter(
        (appointment) => appointment.status === "Accepted"
      );
    },
  },
  methods: {
    approveAppointment(appointment) {
      appointment.status = "Approved";
      this.$emit("appointmentUpdated", "approved");
      alert(`Appointment for ${appointment.studentName} has been approved.`);
    },
    rejectAppointment(appointment) {
      appointment.status = "Rejected";
      this.$emit("appointmentUpdated", "rejected");
      alert(`Appointment for ${appointment.studentName} has been rejected.`);
    },
    openRescheduleModal(appointment) {
      this.selectedAppointment = appointment;
      this.isRescheduleModalOpen = true;
    },
    closeRescheduleModal() {
      this.isRescheduleModalOpen = false;
      this.rescheduleDate = "";
      this.selectedAppointment = null;
    },
    confirmReschedule() {
      if (this.rescheduleDate) {
        this.selectedAppointment.date = this.rescheduleDate;
        this.isRescheduleModalOpen = false;
        this.$emit("appointmentUpdated", "rescheduled");
        alert(
          `Appointment for ${this.selectedAppointment.studentName} rescheduled to ${this.rescheduleDate}`
        );
        this.rescheduleDate = "";
        this.selectedAppointment = null;
      } else {
        alert("Please select a date for rescheduling.");
      }
    },
    cancelAppointment(appointment) {
      appointment.status = "Cancelled";
      this.$emit("appointmentUpdated", "cancelled");
      alert(`Appointment for ${appointment.studentName} has been cancelled.`);
    },
  },
};
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
  gap: 20px;
  padding: 20px;
}
  
.appointment-requests,
.appointment-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
  
.appointment-card {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
  
.appointment-card h5 {
  margin-bottom: 8px;
}
  
.appointment-card p {
  margin: 4px 0;
}
  
.appointment-card .btn {
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
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
</style>