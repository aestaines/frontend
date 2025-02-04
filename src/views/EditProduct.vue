<template>
  <div class="edit-product-container">
    <div class="form-container">
      <button class="back-btn" @click="goBack">← Back</button>
      <h1>Edit Product</h1>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="product-name">Product Name</label>
          <input
            id="product-name"
            v-model="product.name"
            type="text"
            placeholder="Enter product name"
            required
          />
        </div>

        <div class="form-group">
          <label for="product-description">Description</label>
          <input
            id="product-description"
            v-model="product.description"
            type="text"
            placeholder="Enter product description"
            required
          />
        </div>

        <div class="form-group">
          <label for="product-price">Price</label>
          <input
            id="product-price"
            v-model="product.price"
            type="number"
            placeholder="Enter product price"
            required
          />
        </div>

        <div class="form-group">
          <label for="product-quantity">Quantity</label>
          <input
            id="product-quantity"
            v-model="product.quantity"
            type="number"
            placeholder="Enter product quantity"
            required
          />
        </div>

        <div class="button-container">
          <button class="update-btn" type="submit">Update Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axiosInstance from "@/axios"; // Adjust based on your folder structure
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const product = ref({ name: "", description: "", price: "", quantity: "" });
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.id;

    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        product.value = response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Update product details
    const updateProduct = async () => {
      try {
        await axiosInstance.put(`/products/${productId}`, product.value);
        router.push({ name: "product-list" });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };

    // Go back to previous page
    const goBack = () => {
      router.back();
    };

    onMounted(fetchProduct);

    return {
      product,
      updateProduct,
      goBack,
    };
  },
};
</script>

<style scoped>
.edit-product-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
}

.form-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  position: relative;
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

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  background-color: #fff;
}

.button-container {
  display: flex;
  justify-content: center;
}

.update-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.update-btn:hover {
  background-color: #0056b3;
}
</style>
