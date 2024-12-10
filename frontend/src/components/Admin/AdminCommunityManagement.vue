<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Admin Community Management</h1>
        </div>
      </header>
      
      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Create Admin Post Button -->
          <button @click="openCreatePostModal" class="mb-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out">
            Create Admin Post
          </button>
  
          <!-- Posts List -->
          <div class="space-y-8">
            <div v-for="post in sortedPosts" :key="post.id" class="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl">
              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-2xl font-bold text-gray-800">{{ post.title }}</h3>
                  <span v-if="post.isAdminPost" class="bg-yellow-200 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">Admin Post</span>
                  <span v-else-if="post.status === 'pending'" class="bg-orange-200 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">Pending Approval</span>
                  <span v-else-if="post.status === 'approved'" class="bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Approved</span>
                  <span v-else-if="post.status === 'rejected'" class="bg-red-200 text-red-800 text-xs font-medium px-3 py-1 rounded-full">Rejected</span>
                </div>
                <p class="text-gray-600 mb-4 text-lg">{{ post.content }}</p>
                <div class="flex items-center text-sm text-gray-500 mb-4">
                  <span class="mr-4" :class="post.isAdminPost ? 'font-semibold text-yellow-700' : 'font-semibold text-blue-700'">
                    By: {{ post.author }}
                  </span>
                  <span>Posted on: {{ formatDate(post.date) }}</span>
                </div>
                <div class="flex items-center space-x-4">
                  <template v-if="!post.isAdminPost && post.status === 'pending'">
                    <button @click="approvePost(post.id)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                      Approve
                    </button>
                    <button @click="rejectPost(post.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                      Reject
                    </button>
                  </template>
                  <button @click="deletePost(post.id)" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Create Admin Post Modal -->
      <div v-if="showCreatePostModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Create Admin Post</h3>
          <form @submit.prevent="createAdminPost" class="space-y-4">
            <input v-model="newPost.title" placeholder="Post Title" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" required>
            <textarea v-model="newPost.content" placeholder="Post Content" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" rows="4" required></textarea>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeCreatePostModal" class="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out">Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Create Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore'
  
  const db = getFirestore()
  const posts = ref([])
  const newPost = ref({
    title: '',
    content: ''
  })
  const showCreatePostModal = ref(false)
  
  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => b.date - a.date)
  })
  
  const fetchPosts = async () => {
    const postsCollection = collection(db, 'communityPosts')
    const postsQuery = query(postsCollection, orderBy('date', 'desc'), limit(20))
    const postSnapshot = await getDocs(postsQuery)
    posts.value = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
  
  const openCreatePostModal = () => {
    showCreatePostModal.value = true
  }
  
  const closeCreatePostModal = () => {
    showCreatePostModal.value = false
    newPost.value = { title: '', content: '' }
  }
  
  const createAdminPost = async () => {
    const post = {
      title: newPost.value.title,
      content: newPost.value.content,
      author: 'Admin',
      date: new Date(),
      isAdminPost: true,
      status: 'approved'
    }
    
    const docRef = await addDoc(collection(db, 'communityPosts'), post)
    post.id = docRef.id
    posts.value.unshift(post)
    closeCreatePostModal()
  }
  
  const approvePost = async (postId) => {
    await updateDoc(doc(db, 'communityPosts', postId), { status: 'approved' })
    const index = posts.value.findIndex(p => p.id === postId)
    if (index !== -1) {
      posts.value[index].status = 'approved'
    }
  }
  
  const rejectPost = async (postId) => {
    await updateDoc(doc(db, 'communityPosts', postId), { status: 'rejected' })
    const index = posts.value.findIndex(p => p.id === postId)
    if (index !== -1) {
      posts.value[index].status = 'rejected'
    }
  }
  
  const deletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'communityPosts', postId))
      posts.value = posts.value.filter(p => p.id !== postId)
    }
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  onMounted(() => {
    fetchPosts()
  })
  </script>