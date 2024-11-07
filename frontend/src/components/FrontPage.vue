<template>
  <div id="app">
    <header>
      <img src="@/assets/munhi_logo.png" alt="School Logo" class="school-logo" />
      <nav class="nav-top-right">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
    <main>
      <h1>Welcome to Naujan Municipal High School</h1>
      <p class="school-description">
        Naujan Municipal High School is committed to providing quality education that fosters academic excellence,
        character development, and community involvement. We strive to empower students to become responsible citizens
        and lifelong learners.
      </p>
      <div class="cards-container">
        <div class="flip-card" @click="showInfo('vision')">
          <div class="flip-card-inner">
            <div class="flip-card-front education-theme">
              <i class="fas fa-lightbulb"></i>
              <h3>Vision</h3>
            </div>
            <div class="flip-card-back education-theme text-justify">
              We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize
              their full potential and contribute meaningfully to building the nation. As a learner-centered public institution,
              the Department of Education continuously improves itself to better serve its stakeholders.
            </div>
          </div>
        </div>
        <div class="flip-card" @click="showInfo('mission')">
          <div class="flip-card-inner">
            <div class="flip-card-front education-theme">
              <i class="fas fa-book"></i>
              <h3>Mission</h3>
            </div>
            <div class="flip-card-back education-theme text-justify">
              To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education.
              Students learn in a child-friendly, gender-sensitive, safe, and motivating environment.
            </div>
          </div>
        </div>
        <div class="flip-card" @click="showInfo('goals')">
          <div class="flip-card-inner">
            <div class="flip-card-front education-theme">
              <i class="fas fa-bullseye"></i>
              <h3>Goals</h3>
            </div>
            <div class="flip-card-back education-theme text-justify">
              Maka-Diyos <br>
              Maka-tao <br>
              Makakalikasan <br>
              Makabansa
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'FrontPage',
  methods: {
    showInfo(type) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} information goes here.`);
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  font-family: 'Arial', sans-serif;
  background: #f5f7fa;
  margin: 0;
  padding: 0;
  color: #070707;
}

#app {
  text-align: center;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  background: #ffffff00;
  position: relative;
}

.school-logo {
  height: 180px;
  margin-bottom: 10px;
}

.nav-top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 15px;
}

nav a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

main {
  padding: 40px 20px;
}

h1 {
  font-size: 2.8em;
  color: #000000;
  margin-bottom: 10px;
}

.school-description {
  font-size: 1.2em;
  color: #666;
  margin: 20px auto;
  max-width: 800px;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.flip-card {
  background-color: transparent;
  width: 300px;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  border-radius: 12px;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}

.flip-card-front {
  background: #006417;
}

.flip-card-back {
  transform: rotateY(180deg);
  background: #1fde12;
}

.education-theme i {
  font-size: 2em;
  margin-bottom: 8px;
}

.education-theme h3 {
  margin: 0;
  font-size: 1.5em;
}
</style>
