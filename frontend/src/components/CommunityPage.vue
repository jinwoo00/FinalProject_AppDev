<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-2xl font-bold">TechTalk Community</h1>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search discussions..."
                class="bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                @input="debouncedSearch"
              />
              <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-300" />
            </div>
            <button
              @click="toggleDarkMode"
              class="text-white hover:text-gray-200 focus:outline-none"
              :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <SunIcon v-if="isDarkMode" class="h-6 w-6" />
              <MoonIcon v-else class="h-6 w-6" />
            </button>
            <button
              @click="openNewPostModal"
              class="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-full transition duration-150 ease-in-out"
            >
              New Post
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row lg:space-x-8">
        <!-- Posts list -->
        <main class="w-full lg:w-3/4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold">Latest Discussions</h2>
            <div class="flex items-center space-x-4">
              <label for="sort-by" class="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
              <select
                id="sort-by"
                v-model="sortBy"
                class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="comments">Most Comments</option>
              </select>
            </div>
          </div>
          <TransitionGroup name="list" tag="ul" class="space-y-6">
            <li v-for="post in sortedAndPaginatedPosts" :key="post.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-start">
                  <button @click="upvotePost(post.id)" class="mr-4 text-gray-400 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out">
                    <ThumbsUp :class="{ 'text-blue-600': post.upvoted }" />
                    <span class="block text-xs mt-1">{{ post.upvotes }}</span>
                  </button>
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2 hover:text-blue-600 transition duration-150 ease-in-out dark:text-white">
                      {{ post.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">{{ post.excerpt }}</p>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UserIcon class="h-4 w-4 mr-1" />
                      <span class="mr-4">{{ post.author }}</span>
                      <CalendarIcon class="h-4 w-4 mr-1" />
                      <span class="mr-4">{{ formatDate(post.date) }}</span>
                      <MessageSquareIcon class="h-4 w-4 mr-1" />
                      <span>{{ post.comments }} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-4">
                    <button @click="toggleComments(post.id)" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition duration-150 ease-in-out">
                      <MessageSquareIcon class="h-5 w-5" />
                    </button>
                    <button @click="sharePost(post.id)" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition duration-150 ease-in-out">
                      <ShareIcon class="h-5 w-5" />
                    </button>
                    <button @click="bookmarkPost(post.id)" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition duration-150 ease-in-out">
                      <BookmarkIcon class="h-5 w-5" :class="{ 'fill-current': post.bookmarked }" />
                    </button>
                  </div>
                  <button @click="readMore(post.id)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition duration-150 ease-in-out">
                    Read More
                  </button>
                </div>
              </div>
              <div v-if="post.showComments" class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                <h4 class="font-semibold mb-2 dark:text-white">Comments</h4>
                <TransitionGroup name="comments" tag="ul" class="space-y-2">
                  <li v-for="comment in post.commentList" :key="comment.id" class="text-sm animate-fade-in dark:text-gray-300">
                    <span class="font-medium">{{ comment.author }}:</span> {{ comment.text }}
                  </li>
                </TransitionGroup>
                <form @submit.prevent="addComment(post.id)" class="mt-4">
                  <input
                    v-model="newComments[post.id]"
                    type="text"
                    placeholder="Add a comment..."
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  <button type="submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
                    Post Comment
                  </button>
                </form>
              </div>
            </li>
          </TransitionGroup>
          <div v-if="filteredPosts.length === 0" class="text-center py-8">
            <p class="text-xl text-gray-600 dark:text-gray-400">No posts found matching your search.</p>
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
                  : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-600'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="w-full lg:w-1/4 mt-8 lg:mt-0 space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4 dark:text-white">About Our Community</h3>
            <p class="text-gray-600 dark:text-gray-300">Welcome to TechTalk, a place to discuss all things technology, programming, and digital innovation.</p>
            <button @click="joinCommunity" class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
              Join the Community
            </button>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4 dark:text-white">Top Contributors</h3>
            <ul class="space-y-4">
              <li v-for="contributor in topContributors" :key="contributor.id" class="flex items-center">
                <img :src="contributor.avatar" :alt="contributor.name" class="w-10 h-10 rounded-full mr-3">
                <div>
                  <span class="font-medium dark:text-white">{{ contributor.name }}</span>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ contributor.posts }} posts</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-4 dark:text-white">Popular Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in popularTags"
                :key="tag"
                @click="filterByTag(tag)"
                :class="[
                  'px-3 py-1 rounded-full text-sm cursor-pointer transition duration-150 ease-in-out',
                  searchQuery === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300'
                ]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- New Post Modal -->
    <Transition name="modal">
      <div v-if="showNewPostModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full">
          <h2 class="text-2xl font-bold mb-4 dark:text-white">Create New Post</h2>
          <form @submit.prevent="submitNewPost">
            <div class="mb-4">
              <label for="post-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                id="post-title"
                v-model="newPost.title"
                type="text"
                required
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div class="mb-4">
              <label for="post-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
              <textarea
                id="post-content"
                v-model="newPost.content"
                rows="4"
                required
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="post-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
              <input
                id="post-tags"
                v-model="newPost.tags"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="closeNewPostModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ThumbsUp, UserIcon, CalendarIcon, MessageSquareIcon, ShareIcon, BookmarkIcon, SearchIcon, SunIcon, MoonIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const currentPage = ref(1)
const postsPerPage = 5
const newComments = ref({})
const sortBy = ref('latest')
const isDarkMode = ref(false)
const showNewPostModal = ref(false)

const posts = ref([])
const topContributors = ref([])
const popularTags = ref([])

const newPost = ref({
  title: '',
  content: '',
  tags: ''
})

// Simulated API call to fetch posts
const fetchPosts = async () => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "What's new in Vue 3?", excerpt: "Discussing the latest features and improvements in Vue 3, including the Composition API, better TypeScript support, and performance enhancements.", author: "JohnDoe", date: "2023-05-15", comments: 23, upvotes: 45, upvoted: false, bookmarked: false, showComments: false, commentList: [
          { id: 1, author: "Alice", text: "The Composition API is a game-changer!" },
          { id: 2, author: "Bob", text: "I'm loving the improved TypeScript support." }
        ] },
        { id: 2, title: "Best practices for React hooks", excerpt: "Share your tips and tricks for using React hooks effectively. Learn how to optimize performance and avoid common pitfalls.", author: "JaneSmith", date: "2023-05-14", comments: 15, upvotes: 32, upvoted: false, bookmarked: false, showComments: false, commentList: [
          { id: 1, author: "Charlie", text: "useCallback has been a lifesaver for me." },
          { id: 2, author: "David", text: "Don't forget about the rules of hooks!" }
        ] },
        // ... (other posts)
      ])
    }, 500)
  })
}

onMounted(async () => {
  posts.value = await fetchPosts()
  
  // Simulated API calls for top contributors and popular tags
  topContributors.value = [
    { id: 1, name: "Alice Cooper", avatar: "/placeholder.svg?height=40&width=40", posts: 127 },
    { id: 2, name: "Bob Dylan", avatar: "/placeholder.svg?height=40&width=40", posts: 98 },
    { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", posts: 85 },
  ]
  
  popularTags.value = [
    'JavaScript', 'React', 'Vue', 'CSS', 'Node.js', 'TypeScript', 'GraphQL', 'Python', 'DevOps', 'Machine Learning'
  ]

  // Check for user's preferred color scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

const filteredPosts = computed(() => {
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sortedAndPaginatedPosts = computed(() => {
  let sorted = [...filteredPosts.value]
  switch (sortBy.value) {
    case 'popular':
      sorted.sort((a, b) => b.upvotes - a.upvotes)
      break
    case 'comments':
      sorted.sort((a, b) => b.comments - a.comments)
      break
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return sorted.slice(start, end)
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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Debounce function for search
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const debouncedSearch = debounce(() => {
  currentPage.value = 1
}, 300)

// Watch for changes in sortBy and reset to first page
watch(sortBy, () => {
  currentPage.value = 1
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const openNewPostModal = () => {
  showNewPostModal.value = true
}

const closeNewPostModal = () => {
  showNewPostModal.value = false
  newPost.value = { title: '', content: '', tags: '' }
}

const submitNewPost = () => {
  // In a real application, this would send the new post data to an API
  const newPostData = {
    id: posts.value.length + 1,
    title: newPost.value.title,
    excerpt: newPost.value.content.slice(0, 150) + '...',
    author: 'Current User', // In a real app, this would be the logged-in user's name
    date: new Date().toISOString().split('T')[0],
    comments: 0,
    upvotes: 0,
    upvoted: false,
    bookmarked: false,
    showComments: false,
    commentList: []
  }
  
  posts.value.unshift(newPostData)
  closeNewPostModal()
  alert('New post created successfully!')
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

.comments-enter-active,
.comments-leave-active {
  transition: all 0.3s ease;
}
.comments-enter-from,
.comments-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>