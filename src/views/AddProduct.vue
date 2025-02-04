<template>
    <div class="add-product-form">
      <button class="back-btn" @click="goBack">← Back</button>
      <h2>Add New Product</h2>
      <form @submit.prevent="addProduct">
        <div class="form-group">
          <label for="name">Product Name</label>
          <input v-model="newProduct.name" type="text" id="name" placeholder="Product Name" required />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input v-model="newProduct.price" type="number" id="price" placeholder="Price" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="newProduct.description" id="description" placeholder="Product Description"></textarea>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input v-model="newProduct.quantity" type="number" id="quantity" placeholder="Quantity" required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router"; // Import useRouter
  
  export default {
    setup() {
      const router = useRouter(); // Initialize router
      const newProduct = ref({
        name: "",
        price: "",
        description: "",
        quantity: "",
      });
      
    
      // Add product function
      const addProduct = async () => {
        try {
          const token = localStorage.getItem("token"); // Get token from localStorage
          if (!token) {
            console.error("Token not found!");
            return;
          }
  
          // Prepare the form data
          const productData = {
            name: newProduct.value.name,
            description: newProduct.value.description,
            price: newProduct.value.price,
            quantity: newProduct.value.quantity,
          };
  
          // Send POST request with token in the Authorization header
          const response = await axios.post("/products", productData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log(response.data); // Response from the server
          router.push({ name: "product-list" }); // Redirect to product list
        } catch (error) {
          console.log("Error storing product:", error);
        }
      };

      // Go back to previous page
      const goBack = () => {
      router.back();
    };
      return {
        newProduct,
        addProduct,
        goBack
      };
    },
  };
  </script>
  
  <style scoped>
  .add-product-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .add-product-form h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }

  /* Back Button */
.back-btn {
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  display: inline-block;
  text-decoration: underline;
}

.back-btn:hover {
  color: #0056b3;
}
  </style>
  