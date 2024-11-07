<template>
  <div class="user-page">
    <!-- Navbar Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="content">
      <section class="profile-section">
        <h1>Welcome, {{ user.name }}</h1>
        <p>Email: {{ user.email }}</p>
        <p>Member Since: {{ user.memberSince }}</p>
      </section>

      <section class="settings-section">
        <h2>Settings</h2>
        <label>
          <input type="checkbox" v-model="notifications" />
          Enable Notifications
        </label>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        memberSince: 'January 2022',
      },
      notifications: true,
    };
  },
};
</script>

<style scoped>
/* Navbar styling */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Page container styling */
.user-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: rgb(200, 194, 194);
  color: black;
  padding-top: 56px; /* Adjust padding-top to match navbar height */
}

/* Main content styling */
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
}

.profile-section,
.settings-section {
  background-color: #8d8b8b;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  margin-bottom: 10px;
}

/* Logo styles */
.logo {
  position: absolute;
  top: 20px; /* Adjust as necessary */
  right: 20px; /* Adjust as necessary */
  width: 100px; /* Set an appropriate size */
  height: auto; /* Maintain aspect ratio */
}
</style>
