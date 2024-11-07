<template>
  <div class="admin-dashboard d-flex">
    <!-- Sidebar -->
    <nav class="sidebar bg-light border-end">
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
        <h3>Add Student</h3>
        <div class="mb-3">
          <input
            type="text"
            v-model="studentName"
            class="form-control mb-2"
            placeholder="Student Name"
          />
          <input
            type="email"
            v-model="studentEmail"
            class="form-control mb-2"
            placeholder="Student Email"
          />
          <button class="btn btn-success" @click="addStudent">Add Student</button>
        </div>
        <p v-if="addMessage" class="text-success">{{ addMessage }}</p>
      </div>

      <!-- User Registrations Tab -->
      <div v-if="activeTab === 'userRegistrations'">
        <h3>User Registrations</h3>
        <div v-if="users.length === 0" class="alert alert-info">
          No users registered.
        </div>
        <table v-else class="table table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }} {{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.status }}</td>
              <td>
                <button class="btn btn-outline-success btn-sm" @click="approveUser(user.id)">
                  Approve
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="declineUser(user.id)">
                  Decline
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Manage Appointments -->
      <div v-if="activeTab === 'manageAppointments'">
        <h3>Manage Appointments</h3>
        <div v-if="appointments.length === 0" class="alert alert-warning">
          No appointments to display.
        </div>
        <table v-else class="table table-striped">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Student</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ appointment.id }}</td>
              <td>{{ appointment.studentName }}</td>
              <td>{{ appointment.date }}</td>
              <td>{{ appointment.status }}</td>
              <td>
                <button class="btn btn-outline-success btn-sm" @click="approveAppointment()">
                  Approve
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="declineAppointment()">
                  Decline
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Additional Tabs Here... -->
    </div>
  </div>
</template>

<script>
import { setUserRole } from '../adminService';
import { db } from '../firebaseConfig';
import { doc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      userId: '',
      role: 'user',
      studentName: '',
      studentEmail: '',
      message: '',
      addMessage: '',
      activeTab: 'setRole',
      users: [],
      appointments: [],
      moodLogs: [],
      feedbacks: [],
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
    async fetchUsers() {
      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      this.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async updateRole() {
      try {
        await setUserRole(this.userId, this.role);
        this.message = `Role updated to ${this.role} successfully!`;
      } catch (error) {
        this.message = 'Failed to update role.';
      }
    },
    async addStudent() {
      try {
        const studentId = this.studentEmail.split('@')[0];
        await setDoc(doc(db, 'students', studentId), {
          name: this.studentName,
          email: this.studentEmail,
        });
        this.addMessage = 'Student added successfully!';
      } catch (error) {
        this.addMessage = 'Failed to add student.';
      }
    },
    async approveUser(userId) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { status: 'approved' });
      this.message = `User ${userId} approved successfully!`;
      this.fetchUsers();
    },
    async declineUser(userId) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { status: 'declined' });
      this.message = `User ${userId} declined successfully!`;
      this.fetchUsers();
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      this.message = '';
      this.addMessage = '';
      if (tab === 'userRegistrations') {
        this.fetchUsers();
      } else if (tab === 'manageAppointments') {
        this.fetchAppointments();
      } else if (tab === 'viewMoodLogs') {
        this.fetchMoodLogs();
      } else if (tab === 'feedbackManagement') {
        this.fetchFeedbacks();
      }
    },
    async fetchAppointments() {},
    async fetchMoodLogs() {},
    async fetchFeedbacks() {},
    approveAppointment() {},
    declineAppointment() {},
    viewFeedback() {},
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.admin-dashboard {
  height: 100vh;
}

.sidebar {
  width: 250px;
  height: 100%;
  overflow-y: auto;
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
