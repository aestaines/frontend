<template>
    <div>
      <button class="back-btn" @click="goBack">← Back</button>
    </div>
    <div class="profile-container">
      <div class="profile-image">
        <img :src="profileImage" alt="Profile Picture" class="profile-img" />
      </div>
      <div class="profile-info">
        <h2 class="profile-name">{{ name }}</h2>
        <p class="profile-email">{{ email }}</p>
        <p class="profile-role">{{ role }}</p> <!-- Role dynamically bound -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileComponent',
    data() {
      return {
        name: '', // Will be filled dynamically
        email: '', // Will be filled dynamically
        role: '', // Will be filled dynamically
        profileImage: require('@/assets/static-profile-image.jpg'), // Path to static profile image
      };
    },
    created() {
      // Fetch user data from localStorage (assuming it's stored there after login)
      this.loadUserData();
    },
    methods: {
      loadUserData() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          this.name = user.name || 'John Doe'; // Default to 'John Doe' if no name is found
          this.email = user.email || 'johndoe@example.com'; // Default email if not found
          this.role = user.role || 'User'; // Default role if not found
        }
      },
      goBack() {
        this.$router.back(); // Use this.$router instead of useRouter()
      }
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: auto;
  }
  
  .profile-image {
    flex-shrink: 0;
    margin-right: 20px;
  }
  
  .profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
  }
  
  .profile-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }
  
  .profile-email {
    font-size: 1rem;
    color: #555;
  }
  
  .profile-role {
    font-size: 1rem;
    color: #007bff; /* Style for the role */
    font-weight: 600;
    margin-top: 5px;
  }
  </style>
  