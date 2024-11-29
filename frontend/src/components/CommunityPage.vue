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
            <li v-for="post in filteredPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1">
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
                    <button class="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                      <MessageSquareIcon class="h-5 w-5" />
                    </button>
                    <button class="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                      <ShareIcon class="h-5 w-5" />
                    </button>
                    <button class="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                      <BookmarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <button class="text-blue-600 hover:text-blue-800 font-medium transition duration-150 ease-in-out">
                    Read More
                  </button>
                </div>
              </div>
            </li>
          </TransitionGroup>
          <div class="mt-8 flex justify-center">
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
            <button class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
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
// const postsPerPage = 5

const posts = ref([
  { id: 1, title: "What's new in Vue 3?", excerpt: "Discussing the latest features and improvements in Vue 3, including the Composition API, better TypeScript support, and performance enhancements.", author: "JohnDoe", date: "2023-05-15", comments: 23, upvotes: 45, upvoted: false },
  { id: 2, title: "Best practices for React hooks", excerpt: "Share your tips and tricks for using React hooks effectively. Learn how to optimize performance and avoid common pitfalls.", author: "JaneSmith", date: "2023-05-14", comments: 15, upvotes: 32, upvoted: false },
  { id: 3, title: "Comparing Tailwind CSS and Bootstrap", excerpt: "Pros and cons of using Tailwind CSS vs Bootstrap for your next project. Which one should you choose and why?", author: "BobJohnson", date: "2023-05-13", comments: 31, upvotes: 28, upvoted: false },
  { id: 4, title: "The future of JavaScript: What's coming in ES2022?", excerpt: "Explore the upcoming features in ECMAScript 2022 and how they will impact your day-to-day development.", author: "EmilyBrown", date: "2023-05-12", comments: 19, upvotes: 37, upvoted: false },
  { id: 5, title: "Building scalable microservices with Node.js", excerpt: "Learn best practices for designing and implementing microservices architecture using Node.js and popular frameworks.", author: "MichaelLee", date: "2023-05-11", comments: 27, upvotes: 41, upvoted: false },
  { id: 6, title: "Getting started with GraphQL: A beginner's guide", excerpt: "Understand the basics of GraphQL and how it differs from REST APIs. Build your first GraphQL server and client application.", author: "SarahConnor", date: "2023-05-10", comments: 12, upvotes: 23, upvoted: false },
  { id: 7, title: "Mastering CSS Grid Layout", excerpt: "Deep dive into CSS Grid Layout and learn how to create complex, responsive layouts with ease.", author: "DavidMiller", date: "2023-05-09", comments: 18, upvotes: 33, upvoted: false },
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

// const paginatedPosts = computed(() => {
//   const start = (currentPage.value - 1) * postsPerPage
//   const end = start + postsPerPage
//   return filteredPosts.value.slice(start, end)
// })

// const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

// const upvotePost = (postId) => {
//   const post = posts.value.find(p => p.id === postId)
//   if (post) {
//     post.upvoted = !post.upvoted
//     post.upvotes += post.upvoted ? 1 : -1
//   }
// }
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