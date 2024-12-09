<template>
  <div class="container mx-auto p-4 relative">
    <!-- Back Button -->
    <button @click="goBack" class="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back
    </button>

    <h1 class="text-3xl font-bold mb-6 mt-16">{{ communityName }}</h1>

    <!-- New Post Form -->
    <div class="mb-8 bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Create New Post</h2>
      <form @submit.prevent="createPost">
        <input v-model="newPost.title" placeholder="Post Title" class="w-full p-2 mb-2 border rounded" required>
        <textarea v-model="newPost.content" placeholder="Post Content" class="w-full p-2 mb-2 border rounded" rows="3" required></textarea>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Post</button>
      </form>
    </div>

    <!-- Posts List -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Recent Posts</h2>
      <div v-for="post in sortedPosts" :key="post.id" 
           :class="['p-4 rounded shadow mb-4', post.isAdminPost ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-blue-50 border-2 border-blue-200']">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold">{{ post.title }}</h3>
          <span v-if="post.isAdminPost" class="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Admin Post</span>
          <span v-else class="bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">User Post</span>
        </div>
        <p class="text-gray-600 mb-2">{{ post.content }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-4" :class="post.isAdminPost ? 'font-semibold text-yellow-700' : 'font-semibold text-blue-700'">
            By: {{ post.author }}
          </span>
          <span>Posted on: {{ formatDate(post.date) }}</span>
        </div>
        <div class="mt-2 flex items-center">
          <button @click="upvotePost(post.id)" class="text-blue-500 hover:text-blue-700 mr-4">
            Upvote ({{ post.upvotes }})
          </button>
          <template v-if="isAdmin">
            <button @click="editPost(post)" class="text-green-500 hover:text-green-700 mr-4">
              Edit
            </button>
            <button @click="deletePost(post.id)" class="text-red-500 hover:text-red-700">
              Delete
            </button>
          </template>
        </div>

        <!-- Comments Section -->
        <div class="mt-4">
          <h4 class="text-lg font-semibold mb-2">Comments</h4>
          <div v-for="comment in post.comments" :key="comment.id" 
               :class="['p-2 rounded mb-2', comment.isAdminComment ? 'bg-yellow-100' : 'bg-blue-100']">
            <p class="text-sm">{{ comment.content }}</p>
            <p class="text-xs" :class="comment.isAdminComment ? 'text-yellow-700' : 'text-blue-700'">
              By: {{ comment.author }} on {{ formatDate(comment.date) }}
              <span v-if="comment.isAdminComment" class="ml-2 bg-yellow-200 text-yellow-800 text-xs font-medium px-1 py-0.5 rounded">Admin</span>
              <span v-else class="ml-2 bg-blue-200 text-blue-800 text-xs font-medium px-1 py-0.5 rounded">User</span>
            </p>
          </div>
          <!-- New Comment Form -->
          <form @submit.prevent="addComment(post.id)" class="mt-2">
            <textarea v-model="newComments[post.id]" placeholder="Add a comment" class="w-full p-2 border rounded" rows="2" required></textarea>
            <button type="submit" class="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Add Comment</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Post Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-semibold mb-4">Edit Post</h3>
        <form @submit.prevent="updatePost">
          <input v-model="editingPost.title" placeholder="Post Title" class="w-full p-2 mb-2 border rounded" required>
          <textarea v-model="editingPost.content" placeholder="Post Content" class="w-full p-2 mb-2 border rounded" rows="3" required></textarea>
          <div class="flex justify-end">
            <button type="button" @click="showEditModal = false" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit, arrayUnion } from 'firebase/firestore'

const router = useRouter()
const db = getFirestore()
const communityName = ref('Munhi Community')
const posts = ref([])
const newPost = ref({
  title: '',
  content: ''
})
const showEditModal = ref(false)
const editingPost = ref(null)
const newComments = ref({})

const isAdmin = ref(false) // Set to false for user view

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => b.date - a.date)
})

const fetchPosts = async () => {
  const postsCollection = collection(db, 'communityPosts')
  const postsQuery = query(postsCollection, orderBy('date', 'desc'), limit(20))
  const postSnapshot = await getDocs(postsQuery)
  posts.value = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), comments: doc.data().comments || [] }))
}

const createPost = async () => {
  const post = {
    title: newPost.value.title,
    content: newPost.value.content,
    author: isAdmin.value ? 'Admin' : 'User',
    date: new Date(),
    upvotes: 0,
    isAdminPost: isAdmin.value,
    comments: []
  }
  
  const docRef = await addDoc(collection(db, 'communityPosts'), post)
  post.id = docRef.id
  posts.value.unshift(post)
  newPost.value = { title: '', content: '' }
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

const updatePost = async () => {
  if (editingPost.value) {
    await updateDoc(doc(db, 'communityPosts', editingPost.value.id), {
      title: editingPost.value.title,
      content: editingPost.value.content
    })
    const index = posts.value.findIndex(p => p.id === editingPost.value.id)
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...editingPost.value }
    }
    showEditModal.value = false
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
    author: isAdmin.value ? 'Admin' : 'User',
    date: new Date(),
    isAdminComment: isAdmin.value
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

const goBack = () => {
  router.push('/students') // Assuming the user page route is '/user'
}

onMounted(() => {
  fetchPosts()
})
</script>