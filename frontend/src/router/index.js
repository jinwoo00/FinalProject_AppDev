import { createRouter, createWebHistory } from 'vue-router';
import FrontPage from '../components/FrontPage.vue';
import Login from '../components/login.vue';
import HelloWorld from '../components/HelloWorld.vue';
import register from '../components/register.vue';
import user from '../components/user.vue'; // Example of another page

const routes = [
  { path: '/', component: FrontPage, name: 'FrontPage' },
  { path: '/hello', component: HelloWorld, name: 'HelloWorld' },
  { path: '/Login', component: Login, name: 'Login' },
  { path: '/register', component: register, name: 'register' },
  { path: '/user', component: user, name: 'user' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
