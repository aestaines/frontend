<template>
  <nav class="navbar">
    
    <h1 class="logo">Product Management</h1>
    <div style="margin-left: 20px;">
      <button class="home-button" @click="home">Home</button> 
    </div>
    

    <div class="nav-links">
      
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarComponent",
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ name: "login" });
    },
    home() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
/* Make navbar fixed at the top */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between; /* Aligns logo left and logout button right */
  align-items: center;
  padding: 15px 20px;
  z-index: 1000; /* Ensures it stays on top */
}

/* Logo styling */
.logo {
  font-size: 1.5rem;
}

/* Align logout button to the right */
.nav-links {
  margin-left: auto; /* Pushes logout button to the right */
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}


.logout-button:hover {
  background-color: #ff1a1a;
}
.home-button:hover {
  background-color: #ff1a1a;
}

/* Add spacing so content doesn't overlap with the fixed navbar */
.content {
  margin-top: 70px; /* Adjust this based on navbar height */
}
</style>
