<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <!-- Create Post Button -->
        <button @click="openCreatePostModal" class="mb-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out">
          Create a Post
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
                <button @click="upvotePost(post.id)" class="flex items-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                  Upvote ({{ post.upvotes }})
                </button>
                <template v-if="post.author === currentUser">
                  <button @click="editPost(post)" class="text-green-600 hover:text-green-800 transition duration-300 ease-in-out">Edit</button>
                  <button @click="deletePost(post.id)" class="text-red-600 hover:text-red-800 transition duration-300 ease-in-out">Delete</button>
                </template>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="bg-gray-50 p-6 border-t border-gray-200">
              <h4 class="text-xl font-bold mb-4 text-gray-800">Comments</h4>
              <div v-for="comment in post.comments" :key="comment.id" 
                   :class="['p-4 rounded-lg mb-4', comment.isAdminComment ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200']">
                <p class="text-gray-800 mb-2">{{ comment.content }}</p>
                <p class="text-xs" :class="comment.isAdminComment ? 'text-yellow-700' : 'text-blue-700'">
                  By: {{ comment.author }} on {{ formatDate(comment.date) }}
                  <span v-if="comment.isAdminComment" class="ml-2 bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">Admin</span>
                  <span v-else class="ml-2 bg-blue-200 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">User</span>
                </p>
              </div>
              <!-- New Comment Form -->
              <form @submit.prevent="addComment(post.id)" class="mt-4">
                <textarea v-model="newComments[post.id]" placeholder="Add a comment" class="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" rows="2" required></textarea>
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />

    <!-- Create Post Modal -->
    <div v-if="showCreatePostModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Create New Post</h3>
        <form @submit.prevent="createPost" class="space-y-4">
          <input v-model="newPost.title" placeholder="Post Title" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" required>
          <textarea v-model="newPost.content" placeholder="Post Content" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" rows="4" required></textarea>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="closeCreatePostModal" class="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Create Post</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Post Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Edit Post</h3>
        <form @submit.prevent="updatePost" class="space-y-4">
          <input v-model="editingPost.title" placeholder="Post Title" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" required>
          <textarea v-model="editingPost.content" placeholder="Post Content" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" rows="4" required></textarea>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="closeEditModal" class="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit, arrayUnion } from 'firebase/firestore'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

const db = getFirestore()
const posts = ref([])
const newPost = ref({
  title: '',
  content: ''
})
const showCreatePostModal = ref(false)
const showEditModal = ref(false)
const editingPost = ref(null)
const newComments = ref({})

const currentUser = ref('User') // Replace with actual user authentication

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => b.date - a.date)
})

const fetchPosts = async () => {
  const postsCollection = collection(db, 'communityPosts')
  const postsQuery = query(postsCollection, orderBy('date', 'desc'), limit(20))
  const postSnapshot = await getDocs(postsQuery)
  posts.value = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), comments: doc.data().comments || [] }))
}

const openCreatePostModal = () => {
  showCreatePostModal.value = true
}

const closeCreatePostModal = () => {
  showCreatePostModal.value = false
  newPost.value = { title: '', content: '' }
}

const createPost = async () => {
  const post = {
    title: newPost.value.title,
    content: newPost.value.content,
    author: currentUser.value,
    date: new Date(),
    upvotes: 0,
    isAdminPost: false,
    status: 'pending',
    comments: []
  }
  
  const docRef = await addDoc(collection(db, 'communityPosts'), post)
  post.id = docRef.id
  posts.value.unshift(post)
  closeCreatePostModal()
}

const upvotePost = async (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.upvotes++
    await updateDoc(doc(db, 'communityPosts', postId), { upvotes: post.upvotes })
  }
}

const editPost = (post) => {
  editingPost.value = { ...post }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingPost.value = null
}

const updatePost = async () => {
  if (editingPost.value) {
    await updateDoc(doc(db, 'communityPosts', editingPost.value.id), {
      title: editingPost.value.title,
      content: editingPost.value.content,
      status: 'pending' // Reset status to pending after edit
    })
    const index = posts.value.findIndex(p => p.id === editingPost.value.id)
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...editingPost.value, status: 'pending' }
    }
    closeEditModal()
  }
}

const deletePost = async (postId) => {
  if (confirm('Are you sure you want to delete this post?')) {
    await deleteDoc(doc(db, 'communityPosts', postId))
    posts.value = posts.value.filter(p => p.id !== postId)
  }
}

const addComment = async (postId) => {
  const comment = {
    id: Date.now().toString(),
    content: newComments.value[postId],
    author: currentUser.value,
    date: new Date(),
    isAdminComment: false
  }

  const postRef = doc(db, 'communityPosts', postId)
  await updateDoc(postRef, {
    comments: arrayUnion(comment)
  })

  const postIndex = posts.value.findIndex(p => p.id === postId)
  if (postIndex !== -1) {
    posts.value[postIndex].comments.push(comment)
  }

  newComments.value[postId] = ''
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