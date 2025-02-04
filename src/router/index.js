import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';  // Path to Home.vue
import Login from '@/views/LoginPage.vue'; // Assuming you have a Login page
import ProductList from '@/views/ProductList.vue';
import EditProduct from '@/views/EditProduct.vue';
import AddProduct from "@/views/AddProduct.vue";
import ProfileComponent from '@/views/ProfileComponent.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,  // Home page route
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/product-list',
    name: 'product-list',
    component: ProductList,
  },
  {
    path: "/products/add",
    name: "add-product", // New route name for adding product
    component: AddProduct,
  },
  {
    path: "/products/edit/:id", // The dynamic route for editing a product
    name: "edit-product",
    component: EditProduct,
    props: true, // Pass the id as a prop to the component
  },
  {
    path: "/profile/", 
    name: "profile",
    component: ProfileComponent,
    props: true, // Pass the id as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
