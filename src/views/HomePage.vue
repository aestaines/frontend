<template>
    <div class="home-container">
      <div class="welcome-message">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Manage your products, users, and more from here.</p>
      </div>
  
      <div class="action-buttons">
        <router-link to="/product-list" class="btn btn-primary">
          View Product List
        </router-link>
        <router-link to="/profile" class="btn btn-secondary">
          Go to Profile
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  };
  </script>
  
  <style scoped>
  .home-container {
    text-align: center;
    padding: 50px;
    background-color: #f4f6f9;
    min-height: 100vh;
  }
  
  .welcome-message {
    margin-bottom: 30px;
  }
  
  .welcome-message h1 {
    font-size: 2.5rem;
    color: #333;
  }
  
  .welcome-message p {
    font-size: 1.2rem;
    color: #555;
  }
  
  .action-buttons {
    margin-top: 40px;
  }
  
  .btn {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  </style>
  