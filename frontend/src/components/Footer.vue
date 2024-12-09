<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/munhi_logo.png" alt="School Logo" class="logo-img" />
          <h3 class="school-name">Naujan Municipal High School</h3>
        </div>
        <div class="footer-contact">
          <h4>Contact Us</h4>
          <p><MapPinIcon class="icon" /> 123 School St., Naujan, Oriental Mindoro</p>
          <p><PhoneIcon class="icon" /> (123) 456-7890</p>
          <p><MailIcon class="icon" /> info@naujanhighschool.edu</p>
        </div>
        <div class="footer-social">
          <h4>Follow Us</h4>
          <div class="social-icons">
            <a href="#" @click.prevent><FacebookIcon /></a>
            <a href="#" @click.prevent><TwitterIcon /></a>
            <a href="#" @click.prevent><InstagramIcon /></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Naujan Municipal High School. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue';
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-vue-next';

export default {
  name: 'AppFooter',
  components: {
    MapPinIcon,
    PhoneIcon,
    MailIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon
  },
  setup() {
    const currentYear = ref(new Date().getFullYear());

    onMounted(() => {
      // You can add any necessary mounted logic here
    });

    return {
      currentYear
    };
  }
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 40px 0 20px;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.footer-logo, .footer-contact, .footer-social {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  padding: 0 15px;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-img {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
  object-fit: contain;
}

.school-name {
  font-size: 1.4em;
  margin: 0;
  text-align: center;
}

h4 {
  color: #3498db;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.footer-contact p {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.footer-social {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #34495e;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.social-icons a:hover {
  background-color: #3498db;
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 20px;
  text-align: center;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-logo, .footer-contact, .footer-social {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }

  .footer-contact p {
    justify-content: center;
  }

  .footer-social {
    align-items: center;
  }
}
</style>

