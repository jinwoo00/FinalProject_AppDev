import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from '../components/FrontPage.vue';
import Login from '../components/login.vue';
import HelloWorld from '../components/HelloWorld.vue';
import register from '../components/register.vue';
import UserProf from '@/components/UserProf.vue';
import adminDashboard from '@/components/Admin/adminDashboard.vue';
import AddStudent from '@/components/AddStudent.vue';
import UserRegistration from '@/components/UserRegistrations.vue';
import ManageAppointment from '@/components/ManageAppointment.vue';
import CounselingApp from '@/components/CounselingPage.vue';
import MoodLogs from '@/components/MoodLogs.vue';
import EventCalendar from '@/components/EventCalendar.vue';
import UserNotification from '@/components/UserNotification.vue';
import students from '@/components/students.vue';
import community from '@/components/CommunityPage.vue';
import Navbar from '@/components/Navbar.vue';
import Help_Support from '@/components/Help_Support.vue';
import AdminCommunityManagement from '@/components/Admin/AdminCommunityManagement.vue';




const routes = [
  { path: '/', component: FrontPage, name: 'FrontPage' },
  { path: '/hello', component: HelloWorld, name: 'HelloWorld' },
  { path: '/Login', component: Login, name: 'Login' },
  { path: '/register', component: register, name: 'register' },
  { path: '/students', component: students, name: 'students' },
  { path: '/UserProf', component: UserProf, name: 'profile' },
  { path: '/adminDashboard', component: adminDashboard, name: 'AdminDashboard'},
  { path: '/AddStudent', component: AddStudent, name: 'AddStudent'},
  { path: '/UserRegistration', component: UserRegistration, name: 'UserRegistration'},
  { path: '/ManageAppointment', component: ManageAppointment, name: 'ManageAppointment'},
  { path: '/CounselingApp', component: CounselingApp, name: 'CounselingApp'},
  { path: '/Moodlogs', component: MoodLogs, name: MoodLogs},
  { path: '/EventCalendar', component: EventCalendar, name: EventCalendar},
  { path: '/Navbar', component: Navbar, name: Navbar},
  { path: '/UserNotification', component: UserNotification, name: UserNotification},
  { path: '/community', component: community, name: community},
  { path: '/Help_Support', component: Help_Support, name: Help_Support},
  { path: '/AdminCommunityManagement', component: AdminCommunityManagement, name: AdminCommunityManagement},
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
