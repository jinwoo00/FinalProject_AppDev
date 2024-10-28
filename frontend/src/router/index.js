import { createRouter, createWebHistory } from 'vue-router';
import FrontPage from '../components/FrontPage.vue';
import HelloWorld from '../components/HelloWorld.vue'; // Example of another page

const routes = [
  { path: '/', component: FrontPage, name: 'FrontPage' },
  { path: '/hello', component: HelloWorld, name: 'HelloWorld' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
