<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.name }"
                />
                <UserIcon v-if="!errors.name" class="h-5 w-5 text-gray-400 absolute right-3 top-2" />
                <AlertCircleIcon v-else class="h-5 w-5 text-red-500 absolute right-3 top-2" />
              </div>
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
            </div>
  
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.email }"
                />
                <MailIcon v-if="!errors.email" class="h-5 w-5 text-gray-400 absolute right-3 top-2" />
                <AlertCircleIcon v-else class="h-5 w-5 text-red-500 absolute right-3 top-2" />
              </div>
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.password }"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <EyeIcon v-if="showPassword" class="h-5 w-5 text-gray-400" />
                  <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>
  
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
  
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
  
            <div class="mt-6">
              <a href="/login" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { UserIcon, MailIcon, EyeIcon, EyeOffIcon, AlertCircleIcon } from 'lucide-vue-next'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  
  const errors = reactive({
    name: '',
    email: '',
    password: ''
  })
  
  const validateForm = () => {
    let isValid = true
  
    // Reset errors
    errors.name = ''
    errors.email = ''
    errors.password = ''
  
    if (!name.value.trim()) {
      errors.name = 'Name is required'
      isValid = false
    }
  
    if (!email.value.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      errors.email = 'Invalid email format'
      isValid = false
    }
  
    if (!password.value) {
      errors.password = 'Password is required'
      isValid = false
    } else if (password.value.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
      isValid = false
    }
  
    return isValid
  }
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the registration data to your backend
      console.log('Form submitted:', { name: name.value, email: email.value, password: password.value })
      // Reset form after successful submission
      name.value = ''
      email.value = ''
      password.value = ''
      alert('Registration successful!') // Replace with proper success handling
    }
  }
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }
  </script>