<template>
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! You have full access.</p>
    </div>
  </template>
  
  <script>
  export default {
    created() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "login" });
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  