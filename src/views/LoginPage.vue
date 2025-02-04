<template>
  <div class="login-container">
    <div class="login-box">
      <!-- Title added here -->
      <h1 class="app-title">Inventory App</h1>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-login">Login</button>
          <p class="forgot-password"><router-link to="/forgot-password">Forgot Password?</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/api/axios";
// import { useRouter } from "vue-router";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });
        console.log(response.data); // Log response data to ensure structure is correct

        const { token, user } = response.data; // Destructure the 'user' object
        const { name, email, role } = user; // Extract name, email, and role from user

        // Store the token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ name, email, role }));

        // Redirect to the home page
        this.$router.push({ name: "home" });
      } catch (err) {
        this.error = "Invalid credentials.";
      }
    }
  }
};
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh; /* Allows the container to adjust dynamically */
  background: linear-gradient(to right, #3a7bd5, #00d2ff);
}

.login-box {
  background: white;
  padding: 30px; /* Reduced padding for a more compact box */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1.app-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px; /* Reduced space between title and login form */
}

h2 {
  margin-bottom: 10px; /* Reduced space between login heading and inputs */
  font-size: 2rem;
  color: #333;
}


.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  font-size: 1rem;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-group input:focus {
  border-color: #3a7bd5;
  outline: none;
}

.form-footer {
  margin-top: 20px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #3a7bd5;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #00d2ff;
}

.forgot-password {
  margin-top: 10px;
}

.forgot-password a {
  color: #555;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password a:hover {
  color: #3a7bd5;
}
</style>
