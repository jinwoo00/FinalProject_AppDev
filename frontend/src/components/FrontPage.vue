<template>
  <!-- Existing template code remains unchanged -->
  <div class="app">
    <header>
      <div class="header-content">
        <div class="logo-container">
          
          <div class="school-name">
            
          </div>
        </div>
        <nav class="nav-links">
          <a href="/login" class="nav-button">Login</a>
          <a href="/register" class="nav-button register">Register</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <h1>Welcome to Naujan Municipal High School</h1>
        <p class="subtitle">
          Naujan Municipal High School is committed to providing quality education that fosters
          academic excellence, character development, and community involvement. We strive to
          empower students to become responsible citizens and lifelong learners.
        </p>
      </section>

      <section class="cards-section">
        <div class="card" @mouseenter="hoveredCard = 'vision'" @mouseleave="hoveredCard = null">
          <div class="card-content">
            <LightbulbIcon class="card-icon" :class="{ 'icon-hovered': hoveredCard === 'vision' }" />
            <h3>Vision</h3>
            <p v-show="hoveredCard === 'vision'" class="card-details">
              We dream of Filipinos who passionately love their country and whose values and competencies
              enable them to realize their full potential and contribute meaningfully to building the nation.
            </p>
          </div>
        </div>

        <div class="card" @mouseenter="hoveredCard = 'mission'" @mouseleave="hoveredCard = null">
          <div class="card-content">
            <BookOpenIcon class="card-icon" :class="{ 'icon-hovered': hoveredCard === 'mission' }" />
            <h3>Mission</h3>
            <p v-show="hoveredCard === 'mission'" class="card-details">
              To protect and promote the right of every Filipino to quality, equitable, culture-based,
              and complete basic education in a child-friendly, gender-sensitive, and motivating environment.
            </p>
          </div>
        </div>

        <div class="card" @mouseenter="hoveredCard = 'goals'" @mouseleave="hoveredCard = null">
          <div class="card-content">
            <TargetIcon class="card-icon" :class="{ 'icon-hovered': hoveredCard === 'goals' }" />
            <h3>Goals</h3>
            <div v-show="hoveredCard === 'goals'" class="card-details goals-list">
              <ul>
                <li>Maka-Diyos</li>
                <li>Maka-tao</li>
                <li>Makakalikasan</li>
                <li>Makabansa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { LightbulbIcon, BookOpenIcon, TargetIcon } from 'lucide-vue-next'

const hoveredCard = ref(null)
</script>

<style scoped>
.app {
  min-height: 100vh;
 
  
}

header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(26, 26, 25, 0.2);
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('C:/Users/keith/OneDrive/Documents/GitHub/FinalProject_AppDev/frontend/src/assets/schoolmunhi.png');
  background-position: center;
  background-size: cover;
  filter: blur(1px);
  z-index: -1;
}


.header-content {
  max-width: 1500px;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.school-logo {
  width: 80px;
  height: 100px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.school-logo:hover {
  transform: scale(1.05) rotate(5deg);
}

.school-name {
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}

.school-name h2 {
  color: #ffffff;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(26, 26, 25, 0.1);
}

.school-name h3 {
  color: #abcc52;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-button:not(.register) {
  color: #ffffff;
  border: 2px solid #ffffff;
  background-color: #3e5630;
}

.nav-button:not(.register):hover {
  background-color: #859F3D;
  color: #ffffff;
  box-shadow: 0 4px 6px rgba(49, 81, 30, 0.2);
  
}

.nav-button.register {
  background-color: #3e5630;
  color: #F6FCDF;
  border: 2px solid #ffffff;
}

.nav-button.register:hover {
  background-color: #859F3D;
  box-shadow: 0 4px 6px rgba(133, 159, 61, 0.2);
}

main {
  padding-top: 120px;
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

h1 {
  color: #31511E;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(26, 26, 25, 0.2);
  letter-spacing: -0.5px;
}

.subtitle {
  max-width: 800px;
  margin: 0 auto;
  color: #000000;
  line-height: 1.8;
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
}

.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.card {
  background: linear-gradient(145deg, #31511E, #859F3D);
  border-radius: 20px;
  overflow: hidden;
  height: 300px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  box-shadow: 0 10px 20px rgba(26, 26, 25, 0.2);
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(26, 26, 25, 0.3);
}

.card-content {
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #F6FCDF;
  text-align: center;
  transition: all 0.3s ease;
  background: linear-gradient(180deg, rgba(26, 26, 25, 0.1), rgba(26, 26, 25, 0.2));
}

.card:hover .card-content {
  background: linear-gradient(180deg, rgba(26, 26, 25, 0.2), rgba(26, 26, 25, 0.3));
}

.card-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  color: #F6FCDF;
}

.icon-hovered {
  transform: scale(0.9) rotate(360deg);
  color: #F6FCDF;
  opacity: 0.9;
}

.card h3 {
  font-size: 1.8rem;
  margin: 0;
  transition: all 0.3s ease;
  font-weight: 700;
  color: #F6FCDF;
}

.card-details {
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.3s ease forwards;
  color: #F6FCDF;
}

.goals-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.goals-list li {
  margin: 0.7rem 0;
  font-weight: 500;
  color: #F6FCDF;
  text-shadow: 1px 1px 2px rgba(26, 26, 25, 0.2);
}

@keyframes fadeIn {
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .school-logo {
    width: 60px;
    height: 60px;
  }

  h1 {
    font-size: 2.5rem;
  }

  .nav-button {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }

  .cards-section {
    grid-template-columns: 1fr;
  }

  .card {
    height: 250px;
  }

  main {
    padding-top: 150px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .cards-section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

