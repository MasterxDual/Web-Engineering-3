<template>
  <div class="app-container">
    <h1>FastClient Store</h1>
  
    <!-- Navigation menu -->
    <nav class="nav-menu">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/products" class="nav-link">Products</RouterLink>
      <RouterLink to="/clients" class="nav-link">Clients</RouterLink>
      <RouterLink to="/cart" class="nav-link">Cart</RouterLink>
    </nav>
    
    <hr />
  
    <!-- Here views are loaded -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue';
  import type { Ref } from 'vue';
  import type { Product } from './types/Product';

  /* Global product list to share with both components */
  const products = ref<Product[]>([
    { id: 1, name: 'Potatoes', price: 1.5, stock: 1 },
    { id: 2, name: 'Tomatoes', price: 2.0, stock: 15 },
    { id: 3, name: 'Carrots', price: 1.0, stock: 25 },
    { id: 4, name: 'Lettuce', price: 1.2, stock: 0 },
    { id: 5, name: 'Cucumbers', price: 1.8, stock: 8 },
    { id: 6, name: 'Onions', price: 1.3, stock: 30 },
    { id: 7, name: 'Garlic', price: 0.5, stock: 50 },
    { id: 8, name: 'Bell Peppers', price: 2.5, stock: 12 },
    { id: 9, name: 'Broccoli', price: 2.2, stock: 5 },
    { id: 10, name: 'Spinach', price: 1.7, stock: 20 },
  ]);

  // Global cart to share with other components
  const cart = ref<{ id: number; quantity: number }[]>([]);
  
  // Share products globally
  provide<Ref<Product[]>>('products', products);

  // Share cart globally
  provide<Ref<{ id: number; quantity: number }[]>>('cart', cart);
  
</script>

<style scoped>
  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }

  .nav-menu {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .nav-link {
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }

  .nav-link:hover {
    background-color: #007bff;
    color: white;
  }

  hr {
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid #ccc;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-top: 20px;
  }

  @media (max-width: 280px) {
    h1 {
      font-size: 0.8rem;
    }
  }
</style>
