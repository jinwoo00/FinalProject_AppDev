<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">{{ communityName }}</h1>

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
      <div v-for="post in sortedPosts" :key="post.id" class="bg-white p-4 rounded shadow mb-4">
        <h3 class="text-xl font-semibold">{{ post.title }}</h3>
        <p class="text-gray-600 mb-2">{{ post.content }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-4">By: {{ post.author }}</span>
          <span>Posted on: {{ formatDate(post.date) }}</span>
        </div>
        <div class="mt-2 flex items-center">
          <button @click="upvotePost(post.id)" class="text-blue-500 hover:text-blue-700 mr-4">
            Upvote ({{ post.upvotes }})
          </button>
          <span v-if="post.isAdminPost" class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Admin Post</span>
          <template v-if="isAdmin">
            <button @click="editPost(post)" class="text-green-500 hover:text-green-700 mr-4">
              Edit
            </button>
            <button @click="deletePost(post.id)" class="text-red-500 hover:text-red-700">
              Delete
            </button>
          </template>
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
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore'

const db = getFirestore()
const communityName = ref('Tech Talk Community')
const posts = ref([])
const newPost = ref({
  title: '',
  content: ''
})
const showEditModal = ref(false)
const editingPost = ref(null)

const isAdmin = ref(true) // This should be set based on the user's role

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => b.date - a.date)
})

const fetchPosts = async () => {
  const postsCollection = collection(db, 'communityPosts')
  const postsQuery = query(postsCollection, orderBy('date', 'desc'), limit(20))
  const postSnapshot = await getDocs(postsQuery)
  posts.value = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const createPost = async () => {
  const post = {
    title: newPost.value.title,
    content: newPost.value.content,
    author: isAdmin.value ? 'Admin' : 'User',
    date: new Date(),
    upvotes: 0,
    isAdminPost: isAdmin.value
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