<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <div class="py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="px-6 py-8 sm:p-10 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div class="flex flex-col sm:flex-row items-center justify-between">
              <h2 class="text-3xl font-extrabold text-white mb-4 sm:mb-0">
                Your Profile
              </h2>
              <button 
                @click="toggleEditMode" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {{ isEditMode ? 'Cancel' : 'Edit Profile' }}
              </button>
            </div>
          </div>
          
          <div class="px-6 py-8 sm:p-10">
            <div class="space-y-8">
              <!-- Profile Picture -->
              <div class="flex flex-col sm:flex-row items-center">
                <div class="relative">
                  <img 
                    v-if="userData.profilePictureUrl" 
                    :src="userData.profilePictureUrl" 
                    alt="Profile picture" 
                    class="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg" 
                  />
                  <div v-else class="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg class="h-20 w-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div v-if="isEditMode" class="absolute bottom-0 right-0">
                    <input 
                      type="file" 
                      @change="handleFileUpload" 
                      accept="image/jpeg,image/png,image/gif"
                      class="sr-only"
                      id="profile-picture-upload"
                      ref="fileInput"
                    />
                    <label 
                      for="profile-picture-upload"
                      class="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                  <h3 class="text-xl font-semibold text-gray-900">{{ userData.firstname }} {{ userData.lastname }}</h3>
                  <p class="text-sm text-gray-500">{{ userData.email }}</p>
                  <p v-if="uploadStatus" :class="{'text-green-600': uploadStatus.success, 'text-red-600': !uploadStatus.success}" class="mt-2 text-sm">
                    {{ uploadStatus.message }}
                  </p>
                </div>
              </div>

              <!-- Other fields -->
              <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <template v-for="(field) in userFields" :key="field.key">
                  <div class="sm:col-span-1">
                    <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
                    <div class="mt-1">
                      <template v-if="isEditMode">
                        <input 
                          v-if="['firstname', 'middlename', 'lastname', 'email', 'contact', 'address', 'studentID', 'guardianName', 'guardianContact'].includes(field.key)"
                          v-model="userData[field.key]"
                          :id="field.key"
                          :type="field.key === 'email' ? 'email' : 'text'"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <input 
                          v-else-if="field.key === 'dob'"
                          v-model="userData[field.key]"
                          :id="field.key"
                          type="date"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <select 
                          v-else-if="field.key === 'gender'"
                          v-model="userData[field.key]"
                          :id="field.key"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <select 
                          v-else-if="field.key === 'section'"
                          v-model="userData[field.key]"
                          :id="field.key"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select Section</option>
                          <option value="section1">Section 1</option>
                          <option value="section2">Section 2</option>
                        </select>
                      </template>
                      <p v-else class="mt-1 text-sm text-gray-900">{{ userData[field.key] || '-' }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          
          <div v-if="isEditMode" class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button 
              @click="saveProfile" 
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { auth, db } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import NavBar from './Navbar.vue'
import Footer from './Footer.vue'

const isEditMode = ref(false)
const uploadStatus = ref(null)
const fileInput = ref(null)
const userData = reactive({
  firstname: '',
  middlename: '',
  lastname: '',
  dob: '',
  gender: '',
  email: '',
  contact: '',
  address: '',
  studentID: '',
  guardianName: '',
  guardianContact: '',
  section: '',
  profilePictureUrl: ''
})

const userFields = [
  { key: 'firstname', label: 'First Name' },
  { key: 'middlename', label: 'Middle Name' },
  { key: 'lastname', label: 'Last Name' },
  { key: 'dob', label: 'Date of Birth' },
  { key: 'gender', label: 'Gender' },
  { key: 'email', label: 'Email' },
  { key: 'contact', label: 'Contact Number' },
  { key: 'address', label: 'Address' },
  { key: 'studentID', label: 'Student ID' },
  { key: 'guardianName', label: 'Guardian\'s Name' },
  { key: 'guardianContact', label: 'Guardian\'s Contact' },
  { key: 'section', label: 'Section' }
]

const fetchUserData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      Object.keys(userData).forEach(key => {
        if (data[key] !== undefined) {
          userData[key] = data[key]
        }
      })
      console.log('Fetched user data:', userData)
    } else {
      console.log('No such document!')
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchUserData(user.uid)
    }
  })
})

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  uploadStatus.value = null
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB')
      return
    }

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Please upload an image file (JPEG, PNG, or GIF)')
      return
    }

    try {
      uploadStatus.value = { success: false, message: 'Uploading...' }
      
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64String = e.target.result
        
        const userId = auth.currentUser.uid
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
          profilePictureUrl: base64String
        })

        userData.profilePictureUrl = base64String
        uploadStatus.value = { success: true, message: 'Profile picture uploaded successfully!' }
        console.log('Profile picture uploaded')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      uploadStatus.value = { success: false, message: `Failed to upload profile picture: ${error.message}` }
    }
  }
}

const saveProfile = async () => {
  try {
    const userId = auth.currentUser.uid
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, userData)
    console.log('Profile updated successfully:', userData)
    alert('Profile updated successfully!')
    isEditMode.value = false
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again.')
  }
}
</script>