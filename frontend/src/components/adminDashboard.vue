<template>
  <div class="admin-dashboard">
    <!-- Hamburger Menu Button -->
    <button class="hamburger-btn" @click="toggleSidebar">
      &#9776;
    </button>

    <!-- Sidebar -->
    <nav v-if="isSidebarVisible" class="sidebar bg-light border-end">
      <div class="p-4">
        <h2 class="h5">Admin Menu</h2>
        <ul class="list-group">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            class="list-group-item list-group-item-action"
            :class="{ active: activeTab === tab.value }"
            @click="setActiveTab(tab.value)"
          >
            {{ tab.label }}
          </li>
        </ul>
      </div>
    </nav>

    <!-- Content Area -->
    <div class="content flex-grow-1 p-4">
      <h1 class="mb-4">Admin Dashboard</h1>

      <!-- Set User Role Tab -->
      <div v-if="activeTab === 'setRole'">
        <h3>Set User Role</h3>
        <div class="mb-3">
          <input
            type="text"
            v-model="userId"
            class="form-control mb-2"
            placeholder="Enter User ID"
          />
          <select v-model="role" class="form-select mb-3">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button class="btn btn-primary" @click="updateRole">Set Role</button>
        </div>
        <p v-if="message" class="text-success">{{ message }}</p>
      </div>

      <!-- Add Student Tab -->
      <div v-if="activeTab === 'addStudent'">
        <AddStudent />
      </div>

      <!-- User Registrations Tab -->
      <div v-if="activeTab === 'userRegistrations'">
        <UserRegistrations />
      </div>

      <!-- Manage Appointments Tab -->
      <div v-if="activeTab === 'manageAppointments'">
        <ManageAppointment @appointmentUpdated="handleAppointmentUpdate" />
      </div>

      <!-- Additional content for other tabs can go here -->
    </div>
  </div>
</template>

<script>
import AddStudent from './AddStudent.vue'; // Import the AddStudent component
import UserRegistrations from './UserRegistrations.vue'; // Import the UserRegistrations component
import ManageAppointment from './ManageAppointment.vue'; // Import the ManageAppointment component

export default {
  name: 'AdminDashboard',
  components: {
    AddStudent,
    UserRegistrations, // Register the UserRegistrations component
    ManageAppointment, // Register the ManageAppointment component
  },
  data() {
    return {
      isSidebarVisible: false,
      activeTab: 'setRole',
      userId: '',
      role: 'user',
      message: '',
      tabs: [
        { value: 'setRole', label: 'Set User Role' },
        { value: 'addStudent', label: 'Add Student' },
        { value: 'userRegistrations', label: 'User Registrations' },
        { value: 'manageAppointments', label: 'Manage Appointments' },
        { value: 'viewMoodLogs', label: 'View Mood Logs' },
        { value: 'feedbackManagement', label: 'Feedback Management' },
        { value: 'contentManagement', label: 'Content Management' },
        { value: 'systemConfiguration', label: 'System Configuration' },
        { value: 'securityLogs', label: 'Security Logs' },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      this.isSidebarVisible = false; // Close sidebar on tab selection
    },
    updateRole() {
      // Example of updating user role
      this.message = `Role updated to ${this.role} for User ID: ${this.userId}`;
    },
    handleAppointmentUpdate(action) {
      // Handle the action, e.g., refresh data, show a notification, etc.
      console.log(`Appointment was ${action}`);
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
}

.hamburger-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.sidebar {
  width: 250px;
  height: 100%;
  overflow-y: auto;
  transition: transform 0.3s ease;
  background-color: #f8f9fa;
}

.list-group-item.active {
  background-color: #007bff;
  color: white;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
