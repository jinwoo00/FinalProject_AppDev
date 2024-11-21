<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <div class="flex-grow bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
            <h2 class="text-xl font-semibold leading-6 text-gray-900 mb-4 sm:mb-0">
              Your Profile Information
            </h2>
            <button 
              @click="toggleEditMode" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ isEditMode ? 'Cancel' : 'Edit Profile' }}
            </button>
          </div>
          
          <div class="border-t border-gray-200">
            <dl>
              <!-- Profile Picture -->
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Profile Picture</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="flex flex-col sm:flex-row items-center">
                    <span class="h-20 w-20 rounded-full overflow-hidden bg-gray-100 mb-4 sm:mb-0">
                      <img 
                        v-if="userData.profilePictureUrl" 
                        :src="userData.profilePictureUrl" 
                        alt="Profile picture" 
                        class="h-full w-full object-cover" 
                      />
                      <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <div v-if="isEditMode" class="ml-0 sm:ml-5 mt-4 sm:mt-0">
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
                        class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        Choose new picture
                      </label>
                      <p v-if="uploadStatus" :class="{'text-green-600': uploadStatus.success, 'text-red-600': !uploadStatus.success}" class="mt-2 text-sm">
                        {{ uploadStatus.message }}
                      </p>
                    </div>
                  </div>
                </dd>
              </div>

              <!-- Other fields -->
              <div v-for="(field, index) in userFields" :key="field.key" :class="{'bg-gray-50': index % 2 === 0, 'bg-white': index % 2 !== 0}" class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">{{ field.label }}</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="isEditMode">
                    <input 
                      v-if="['firstname', 'middlename', 'lastname', 'email', 'contact', 'address', 'studentID', 'guardianName', 'guardianContact'].includes(field.key)"
                      v-model="userData[field.key]"
                      :type="field.key === 'email' ? 'email' : 'text'"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <input 
                      v-else-if="field.key === 'dob'"
                      v-model="userData[field.key]"
                      type="date"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    <select 
                      v-else-if="field.key === 'gender'"
                      v-model="userData[field.key]"
                      class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <select 
                      v-else-if="field.key === 'section'"
                      v-model="userData[field.key]"
                      class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select Section</option>
                      <option value="section1">Section 1</option>
                      <option value="section2">Section 2</option>
                    </select>
                  </template>
                  <template v-else>
                    {{ userData[field.key] || '-' }}
                  </template>
                </dd>
              </div>
            </dl>
          </div>
          
          <div v-if="isEditMode" class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button 
              @click="saveProfile" 
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

<script>
import { ref, reactive, onMounted } from 'vue'
import { auth, db } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import NavBar from './Navbar.vue'
import Footer from './Footer.vue'

export default {
  name: 'UserProf',
  components: {
    NavBar,
    Footer
  },
  setup() {
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
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size should not exceed 5MB')
          return
        }

        // Check file type
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
          alert('Please upload an image file (JPEG, PNG, or GIF)')
          return
        }

        try {
          uploadStatus.value = { success: false, message: 'Uploading...' }
          
          // Convert file to base64
          const reader = new FileReader()
          reader.onload = async (e) => {
            const base64String = e.target.result
            
            // Update user document in Firestore with the base64 string
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

    return {
      isEditMode,
      userData,
      userFields,
      uploadStatus,
      fileInput,
      toggleEditMode,
      handleFileUpload,
      saveProfile
    }
  }
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>