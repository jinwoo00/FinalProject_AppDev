import { createRouter, createWebHistory } from 'vue-router';
import FrontPage from '../components/FrontPage.vue';
import Login from '../components/login.vue';
import HelloWorld from '../components/HelloWorld.vue';
import register from '../components/register.vue';
import user from '../components/user.vue'; // Example of another page
import UserProf from '@/components/UserProf.vue';
import adminDashboard from '../components/adminDashboard.vue';
import counselingapp from '@/components/counselingapp.vue';
import AddStudent from '@/components/AddStudent.vue';
import UserRegistration from '@/components/UserRegistrations.vue';
import ManageAppointment from '@/components/ManageAppointment.vue';
import 'bootstrap/dist/css/bootstrap.min.css';



const routes = [
  { path: '/', component: FrontPage, name: 'FrontPage' },
  { path: '/hello', component: HelloWorld, name: 'HelloWorld' },
  { path: '/Login', component: Login, name: 'Login' },
  { path: '/register', component: register, name: 'register' },
  { path: '/user', component: user, name: 'user' },
  { path: '/UserProf', component: UserProf, name: 'profile' },
  { path: '/adminDashboard', component: adminDashboard, name: 'AdminDashboard'},
  { path: '/counselingapp', component: counselingapp, name: 'counselingapp'},
  { path: '/AddStudent', component: AddStudent, name: 'AddStudent'},
  { path: '/UserRegistration', component: UserRegistration, name: 'UserRegistration'},
  { path: '/ManageAppointment', component: ManageAppointment, name: 'ManageAppointment'},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
