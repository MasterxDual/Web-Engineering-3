<template>
  <!-- Principal container -->
  <v-app>
    <!-- Superior navigation bar -->
    <v-app-bar app color="primary" dark>
      <!-- Title -->
      <v-toolbar-title>FastClient Store</v-toolbar-title>
      <!-- Flexible space to push elements to the right -->
      <v-spacer />
      <!-- User information display if it's logged in the website -->
      <template v-if="user">
        <v-chip class="mr-2" color="grey-darken-5" text-color="white" label>
          {{ user.email }}
        </v-chip>
        <v-btn class="button" color="secondary" @click="onLogout">Salir</v-btn>
      </template>
      <!-- Tab navigation -->
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/products">Products</v-tab>
        <v-tab to="/clients">Clients</v-tab>
        <v-tab to="/cart">Cart</v-tab>
      </v-tabs>
    </v-app-bar>
    <!-- Principal area of content -->
    <v-main>
      <!-- Margin container -->
      <v-container>
        <!-- Renders different views from vue-router -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue';
  import type { Ref } from 'vue';
  import type { Product } from './types/Product';
  import { useAuth } from './composables/useAuth';

  /* The tab variable is a reactive reference that:
    Controls the active tab in navigation (v-tabs)
    Automatically syncs with the user's selection thanks to v-model="tab"
    Allows programmatically changing the active tab
    Works with Vue-Router thanks to the to attribute on each v-tab */
  const tab = ref(null);

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

  const cart = ref<{ id: number; quantity: number }[]>([]);

  provide<Ref<Product[]>>('products', products);
  provide<Ref<{ id: number; quantity: number }[]>>('cart', cart);

  const { user, doLogout } = useAuth();

  /**
   * Handles user logout by invoking the logout function from useAuth
   * and redirecting to the login page.
   */ 
  function onLogout() {
    doLogout();
    window.location.href = '/login';
  }
</script>

<style scoped>
  .button {
    color: white;
  }
</style>
