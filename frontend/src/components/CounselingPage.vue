<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-center text-blue-600">Book a Counseling Appointment</h1>

    <!-- Available Time Slots -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Available Time Slots</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="slot in availableSlots" :key="slot.id" class="bg-gray-50 p-4 rounded-md">
          <p class="text-lg font-medium">{{ slot.date }} - {{ slot.time }}</p>
          <p class="text-sm text-gray-600 mb-2">Counselor: {{ slot.counselor }}</p>
          <button 
            @click="bookAppointment(slot)" 
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>

    <!-- Appointment Confirmation Modal -->
    <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 class="text-xl font-semibold mb-4">Confirm Appointment</h3>
        <p>Date: {{ selectedSlot.date }}</p>
        <p>Time: {{ selectedSlot.time }}</p>
        <p>Counselor: {{ selectedSlot.counselor }}</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button 
            @click="confirmAppointment" 
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            :disabled="isBooking"
          >
            {{ isBooking ? 'Booking...' : 'Confirm' }}
          </button>
          <button 
            @click="cancelAppointment" 
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            :disabled="isBooking"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default {
  name: 'StudentAppointmentBooking',
  data() {
    return {
      availableSlots: [
        { id: 1, date: '2024-03-15', time: '9:00 AM - 10:00 AM', counselor: 'Dr. Smith' },
        { id: 2, date: '2024-03-15', time: '2:00 PM - 3:00 PM', counselor: 'Dr. Johnson' },
        { id: 3, date: '2024-03-16', time: '10:00 AM - 11:00 AM', counselor: 'Dr. Williams' },
        { id: 4, date: '2024-03-16', time: '3:00 PM - 4:00 PM', counselor: 'Dr. Brown' },
      ],
      showConfirmationModal: false,
      selectedSlot: null,
      isBooking: false,
    };
  },
  methods: {
    bookAppointment(slot) {
      this.selectedSlot = { ...slot };
      this.showConfirmationModal = true;
    },
    async confirmAppointment() {
      this.isBooking = true;
      try {
        await addDoc(collection(db, "appointments"), {
          date: this.selectedSlot.date,
          time: this.selectedSlot.time,
          counselor: this.selectedSlot.counselor,
          studentName: "Student Name" // Customize or add more details as needed
        });
        alert(`Appointment booked successfully for ${this.selectedSlot.date} at ${this.selectedSlot.time} with ${this.selectedSlot.counselor}`);
        this.availableSlots = this.availableSlots.filter(slot => slot.id !== this.selectedSlot.id);
        this.showConfirmationModal = false;
        this.selectedSlot = null;
      } catch (error) {
        console.error("Error booking appointment: ", error);
        alert("Failed to book appointment. Please try again.");
      } finally {
        this.isBooking = false;
      }
    },
    cancelAppointment() {
      this.showConfirmationModal = false;
      this.selectedSlot = null;
    },
  },
};
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
