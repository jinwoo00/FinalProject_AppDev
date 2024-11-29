<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-2xl font-bold">TechTalk Community</h1>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search discussions..."
              class="bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-300" />
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row lg:space-x-8">
        <!-- Posts list -->
        <main class="w-full lg:w-3/4">
          <h2 class="text-3xl font-bold mb-6">Latest Discussions</h2>
          <TransitionGroup name="list" tag="ul" class="space-y-6">
            <li v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-start">
                  <button @click="upvotePost(post.id)" class="mr-4 text-gray-400 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                    <ThumbsUp :class="{ 'text-blue-600': post.upvoted }" />
                    <span class="block text-xs mt-1">{{ post.upvotes }}</span>
                  </button>
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2 hover:text-blue-600 transition duration-150 ease-in-out">
                      {{ post.title }}
                    </h3>
                    <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
                    <div class="flex items-center text-sm text-gray-500">
                      <UserIcon class="h-4 w-4 mr-1" />
                      <span class="mr-4">{{ post.author }}</span>
                      <CalendarIcon class="h-4 w-4 mr-1" />
                      <span class="mr-4">{{ post.date }}</span>
                      <MessageSquareIcon class="h-4 w-4 mr-1" />
                      <span>{{ post.comments }} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-4">
                    <button @click="toggleComments(post.id)" class="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                      <MessageSquareIcon class="h-5 w-5" />
                    </button>
                    <button @click="sharePost(post.id)" class="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                      <ShareIcon class="h-5 w-5" />
                    </button>
                    <button @click="bookmarkPost(post.id)" class="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                      <BookmarkIcon class="h-5 w-5" :class="{ 'fill-current': post.bookmarked }" />
                    </button>
                  </div>
                  <button @click="readMore(post.id)" class="text-blue-600 hover:text-blue-800 font-medium transition duration-150 ease-in-out">
                    Read More
                  </button>
                </div>
              </div>
              <div v-if="post.showComments" class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <h4 class="font-semibold mb-2">Comments</h4>
                <ul class="space-y-2">
                  <li v-for="comment in post.commentList" :key="comment.id" class="text-sm">
                    <span class="font-medium">{{ comment.author }}:</span> {{ comment.text }}
                  </li>
                </ul>
                <form @submit.prevent="addComment(post.id)" class="mt-4">
                  <input
                    v-model="newComments[post.id]"
                    type="text"
                    placeholder="Add a comment..."
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
                    Post Comment
                  </button>
                </form>
              </div>
            </li>
          </TransitionGroup>
          <div v-if="filteredPosts.length === 0" class="text-center py-8">
            <p class="text-xl text-gray-600">No posts found matching your search.</p>
          </div>
          <div v-if="filteredPosts.length > 0" class="mt-8 flex justify-center">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'mx-1 px-4 py-2 rounded-md',
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="w-full lg:w-1/4 mt-8 lg:mt-0 space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4">About Our Community</h3>
            <p class="text-gray-600">Welcome to TechTalk, a place to discuss all things technology, programming, and digital innovation.</p>
            <button @click="joinCommunity" class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
              Join the Community
            </button>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4">Top Contributors</h3>
            <ul class="space-y-4">
              <li v-for="contributor in topContributors" :key="contributor.id" class="flex items-center">
                <img :src="contributor.avatar" :alt="contributor.name" class="w-10 h-10 rounded-full mr-3">
                <div>
                  <span class="font-medium">{{ contributor.name }}</span>
                  <p class="text-sm text-gray-500">{{ contributor.posts }} posts</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4">Popular Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in popularTags"
                :key="tag"
                @click="filterByTag(tag)"
                class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition duration-150 ease-in-out"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ThumbsUp, UserIcon, CalendarIcon, MessageSquareIcon, ShareIcon, BookmarkIcon, SearchIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const currentPage = ref(1)
const postsPerPage = 5
const newComments = ref({})

const posts = ref([
  { id: 1, title: "What's new in Vue 3?", excerpt: "Discussing the latest features and improvements in Vue 3, including the Composition API, better TypeScript support, and performance enhancements.", author: "JohnDoe", date: "2023-05-15", comments: 23, upvotes: 45, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Alice", text: "The Composition API is a game-changer!" },
    { id: 2, author: "Bob", text: "I'm loving the improved TypeScript support." }
  ] },
  { id: 2, title: "Best practices for React hooks", excerpt: "Share your tips and tricks for using React hooks effectively. Learn how to optimize performance and avoid common pitfalls.", author: "JaneSmith", date: "2023-05-14", comments: 15, upvotes: 32, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Charlie", text: "useCallback has been a lifesaver for me." },
    { id: 2, author: "David", text: "Don't forget about the rules of hooks!" }
  ] },
  { id: 3, title: "Comparing Tailwind CSS and Bootstrap", excerpt: "Pros and cons of using Tailwind CSS vs Bootstrap for your next project. Which one should you choose and why?", author: "BobJohnson", date: "2023-05-13", comments: 31, upvotes: 28, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Eve", text: "Tailwind's utility-first approach is so productive." },
    { id: 2, author: "Frank", text: "Bootstrap's pre-built components are hard to beat." }
  ] },
  { id: 4, title: "The future of JavaScript: What's coming in ES2022?", excerpt: "Explore the upcoming features in ECMAScript 2022 and how they will impact your day-to-day development.", author: "EmilyBrown", date: "2023-05-12", comments: 19, upvotes: 37, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Grace", text: "Can't wait for the new class features!" },
    { id: 2, author: "Henry", text: "The new RegExp match indices look promising." }
  ] },
  { id: 5, title: "Building scalable microservices with Node.js", excerpt: "Learn best practices for designing and implementing microservices architecture using Node.js and popular frameworks.", author: "MichaelLee", date: "2023-05-11", comments: 27, upvotes: 41, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Ivy", text: "Great overview of microservices architecture!" },
    { id: 2, author: "Jack", text: "How do you handle inter-service communication?" }
  ] },
  { id: 6, title: "Getting started with GraphQL: A beginner's guide", excerpt: "Understand the basics of GraphQL and how it differs from REST APIs. Build your first GraphQL server and client application.", author: "SarahConnor", date: "2023-05-10", comments: 12, upvotes: 23, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Kelly", text: "GraphQL has simplified our API so much!" },
    { id: 2, author: "Liam", text: "How does GraphQL handle caching?" }
  ] },
  { id: 7, title: "Mastering CSS Grid Layout", excerpt: "Deep dive into CSS Grid Layout and learn how to create complex, responsive layouts with ease.", author: "DavidMiller", date: "2023-05-09", comments: 18, upvotes: 33, upvoted: false, bookmarked: false, showComments: false, commentList: [
    { id: 1, author: "Mia", text: "CSS Grid has revolutionized my layouts!" },
    { id: 2, author: "Noah", text: "How does it compare to Flexbox for complex layouts?" }
  ] },
])

const topContributors = ref([
  { id: 1, name: "Alice Cooper", avatar: "/placeholder.svg?height=40&width=40", posts: 127 },
  { id: 2, name: "Bob Dylan", avatar: "/placeholder.svg?height=40&width=40", posts: 98 },
  { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", posts: 85 },
])

const popularTags = ref([
  'JavaScript', 'React', 'Vue', 'CSS', 'Node.js', 'TypeScript', 'GraphQL', 'Python', 'DevOps', 'Machine Learning'
])

const filteredPosts = computed(() => {
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const upvotePost = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.upvoted = !post.upvoted
    post.upvotes += post.upvoted ? 1 : -1
  }
}

const toggleComments = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.showComments = !post.showComments
  }
}

const sharePost = (postId) => {
  // In a real application, this would open a share dialog or copy a link to clipboard
  alert(`Sharing post with ID: ${postId}`)
}

const bookmarkPost = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.bookmarked = !post.bookmarked
    alert(post.bookmarked ? `Post "${post.title}" has been bookmarked.` : `Bookmark removed from "${post.title}".`)
  }
}

const readMore = (postId) => {
  // In a real application, this would navigate to a full post view
  alert(`Navigating to full post with ID: ${postId}`)
}

const addComment = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post && newComments.value[postId]) {
    post.commentList.push({
      id: post.commentList.length + 1,
      author: "Current User", // In a real app, this would be the logged-in user's name
      text: newComments.value[postId]
    })
    post.comments += 1
    newComments.value[postId] = ''
  }
}

const joinCommunity = () => {
  // In a real application, this would open a registration form or navigate to a sign-up page
  alert("Joining the TechTalk Community!")
}

const filterByTag = (tag) => {
  searchQuery.value = tag
  currentPage.value = 1
}

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>