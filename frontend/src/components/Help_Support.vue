<template>
    <div class="help-support-page">
      <NavBar />
      <div class="help-support">
        <div class="container">
          <h1 class="page-title">Help and Support</h1>
          
          <section class="faq-section">
            <h2>Frequently Asked Questions</h2>
            <TransitionGroup name="fade" tag="div">
              <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
                <button 
                  @click="toggleFaq(index)" 
                  class="faq-question"
                  :class="{ 'active': faq.isOpen }"
                  :aria-expanded="faq.isOpen"
                >
                  {{ faq.question }}
                  <ChevronDownIcon :class="{ 'rotate': faq.isOpen }" />
                </button>
                <transition name="slide">
                  <div v-show="faq.isOpen" class="faq-answer">
                    <p>{{ faq.answer }}</p>
                  </div>
                </transition>
              </div>
            </TransitionGroup>
          </section>
  
          <section class="contact-form-section">
            <h2>Contact Us</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="formData.name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" v-model="formData.subject" required>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="formData.message" required></textarea>
              </div>
              <button type="submit" class="submit-button">
                <SendIcon class="icon" />
                Send Message
              </button>
            </form>
          </section>
  
          <section class="additional-resources">
            <h2>Additional Resources</h2>
            <div class="resource-grid">
              <a href="#" @click.prevent="openResource('student-handbook')" class="resource-item">
                <BookOpenIcon class="resource-icon" />
                <span>Student Handbook</span>
              </a>
              <a href="#" @click.prevent="openResource('academic-calendar')" class="resource-item">
                <CalendarIcon class="resource-icon" />
                <span>Academic Calendar</span>
              </a>
              <a href="#" @click.prevent="openResource('library-resources')" class="resource-item">
                <LibraryIcon class="resource-icon" />
                <span>Library Resources</span>
              </a>
            </div>
          </section>
        </div>
      </div>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ChevronDownIcon, SendIcon, BookOpenIcon, CalendarIcon, LibraryIcon } from 'lucide-vue-next';
  import NavBar from '@/components/Navbar.vue';
  import AppFooter from '@/components/Footer.vue';
  
  export default {
    name: 'HelpAndSupport',
    components: {
      ChevronDownIcon,
      SendIcon,
      BookOpenIcon,
      CalendarIcon,
      LibraryIcon,
      NavBar,
      AppFooter
    },
    setup() {
      const faqs = ref([
        {
          question: 'How do I reset my password?',
          answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
          isOpen: false
        },
        {
          question: 'What are the school hours?',
          answer: 'Regular school hours are from 7:30 AM to 4:00 PM, Monday through Friday. However, specific schedules may vary by grade level.',
          isOpen: false
        },
        {
          question: 'How can I access my grades online?',
          answer: 'You can access your grades through our online student portal. Log in with your student ID and password to view your current grades and academic progress.',
          isOpen: false
        }
      ]);
  
      const formData = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
  
      const toggleFaq = (index) => {
        faqs.value[index].isOpen = !faqs.value[index].isOpen;
      };
  
      const submitForm = () => {
        console.log('Form submitted:', formData.value);
        formData.value = { name: '', email: '', subject: '', message: '' };
        alert('Thank you for your message. We will get back to you soon!');
      };
  
      const openResource = (resource) => {
        console.log('Opening resource:', resource);
        alert(`Opening ${resource}. This feature is not yet implemented.`);
      };
  
      return {
        faqs,
        formData,
        toggleFaq,
        submitForm,
        openResource
      };
    }
  };
  </script>
  
  <style scoped>
  .help-support-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f0f4f8;
    font-family: 'Arial', sans-serif;
  }
  
  .help-support {
    flex-grow: 1;
    padding: 60px 0;
  }
  
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .page-title {
    font-size: 3em;
    color: #2c3e50;
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
  }
  
  h2 {
    font-size: 2em;
    color: #3498db;
    margin-bottom: 25px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }
  
  .faq-section, .contact-form-section, .additional-resources {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 40px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .faq-item {
    margin-bottom: 20px;
  }
  
  .faq-question {
    width: 100%;
    text-align: left;
    background: #f8f9fa;
    border: none;
    padding: 15px;
    font-size: 1.1em;
    color: #2c3e50;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .faq-question:hover, .faq-question.active {
    background-color: #e9ecef;
  }
  
  .faq-answer {
    padding: 15px;
    color: #34495e;
    background-color: #f8f9fa;
    border-radius: 0 0 8px 8px;
    margin-top: -8px;
  }
  
  .rotate {
    transform: rotate(180deg);
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 1em;
    transition: border-color 0.3s ease;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #3498db;
  }
  
  textarea {
    height: 150px;
    resize: vertical;
  }
  
  .submit-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .submit-button:hover {
    background-color: #2980b9;
  }
  
  .submit-button .icon {
    margin-right: 8px;
  }
  
  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .resource-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    text-decoration: none;
    color: #2c3e50;
    transition: all 0.3s ease;
  }
  
  .resource-item:hover {
    background-color: #e9ecef;
    transform: translateY(-5px);
  }
  
  .resource-icon {
    font-size: 2em;
    margin-bottom: 10px;
    color: #3498db;
  }
  
  /* Transitions */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-enter-from, .slide-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    .page-title {
      font-size: 2.5em;
    }
  
    h2 {
      font-size: 1.8em;
    }
  
    .faq-section, .contact-form-section, .additional-resources {
      padding: 20px;
    }
  
    .resource-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>