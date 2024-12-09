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
      <div v-for="post in posts" :key="post.id" class="bg-white p-4 rounded shadow mb-4">
        <h3 class="text-xl font-semibold">{{ post.title }}</h3>
        <p class="text-gray-600 mb-2">{{ post.content }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-4">By: {{ post.author }}</span>
          <span>Posted on: {{ formatDate(post.date) }}</span>
        </div>
        <div class="mt-2">
          <button @click="upvotePost(post.id)" class="text-blue-500 hover:text-blue-700">
            Upvote ({{ post.upvotes }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const communityName = ref('Simple Tech Talk Community')
    const posts = ref([
      {
        id: 1,
        title: 'Welcome to our community!',
        content: 'This is our first post. Feel free to share your thoughts and ideas.',
        author: 'Admin',
        date: new Date('2023-05-20'),
        upvotes: 5
      }
    ])

    const newPost = ref({
      title: '',
      content: ''
    })

    const createPost = () => {
      const post = {
        id: posts.value.length + 1,
        title: newPost.value.title,
        content: newPost.value.content,
        author: 'User', // In a real app, this would be the logged-in user
        date: new Date(),
        upvotes: 0
      }
      posts.value.unshift(post)
      newPost.value = { title: '', content: '' }
    }

    const upvotePost = (postId) => {
      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.upvotes++
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      communityName,
      posts,
      newPost,
      createPost,
      upvotePost,
      formatDate
    }
  }
}
</script>