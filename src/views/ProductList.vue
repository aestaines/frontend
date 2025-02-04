<template>
  <div>
    <NavBarComponent />

    <div class="content">
      <h1 class="page-title">Product List</h1>
      
      <div class="action-container">
        <!-- Dropdown for items per page -->
        <label for="itemsPerPage" class="items-per-page-label">Items per page:</label>
        <select v-model="itemsPerPage" class="items-per-page-dropdown" id="itemsPerPage">
          <option v-for="option in [5, 10, 15, 20, 50]" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search product..." class="search-input" />
        <button class="action-button" @click="navigateToAddProduct">Add New Product</button>
      </div>

      <div class="table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in paginatedProducts" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>${{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>
                <button class="edit-button" @click="editProduct(product.id)">Edit</button>
                <button class="delete-button" @click="confirmDelete(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination-btn">Next</button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Are you sure you want to delete this product?</h3>
        <div class="modal-actions">
          <button class="modal-btn confirm-btn" @click="deleteProduct">Yes</button>
          <button class="modal-btn cancel-btn" @click="showDeleteModal = false">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent.vue";
import axios from "axios";

export default {
  components: {
    NavBarComponent,
  },
  data() {
    return {
      products: [],
      searchQuery: "",
      showDeleteModal: false,
      selectedProductId: null,
      currentPage: 1,
      itemsPerPage: 5, // Adjust items per page
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredProducts.slice(start, start + this.itemsPerPage);
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    editProduct(id) {
      this.$router.push({ name: "edit-product", params: { id } });
    },
    navigateToAddProduct() {
      this.$router.push({ name: "add-product" });
    },
    confirmDelete(id) {
      this.selectedProductId = id;
      this.showDeleteModal = true;
    },
    async deleteProduct() {
      try {
        await axios.delete(`/products/${this.selectedProductId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.showDeleteModal = false;
        alert("Product has been deleted.");
        this.fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

<style scoped>
/* Main Content */
.content {
  margin-top: 80px;
  padding: 20px;
}

/* Page Title */
.page-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

/* Items per Page Dropdown */
.items-per-page-label {
  font-size: 1rem;
  margin-right: 10px;
}

.items-per-page-dropdown {
  padding: 5px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
}

/* Search Bar */
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search-input {
  padding: 8px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Table Styling */
.table-container {
  overflow-x: auto;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

/* Button Styles */
.action-button,
.edit-button,
.delete-button,
.modal-btn {
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: white;
  margin-right: 10px;
}

.action-button {
  background-color: #4caf50;
}

.edit-button {
  background-color: #ffa500;
}

.delete-button {
  background-color: #ff4d4d;
}

.modal-btn {
  padding: 12px 20px;
  font-size: 1rem;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #4caf50;
}

.cancel-btn {
  background-color: #ff4d4d;
}

.modal-btn:hover {
  opacity: 0.9;
}

.action-button:hover {
  background-color: #45a049;
}

.edit-button:hover {
  background-color: #e69500;
}

.delete-button:hover {
  background-color: #ff1a1a;
}

/* Pagination */
.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination-btn {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-table th,
  .product-table td {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>
