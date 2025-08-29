
<template>
  <h1>Tienda FastClient</h1>
  
  <!-- Product List -->
  <ProductListSearch @add-to-cart="handleAddToCart" :products="products"/>

  <!-- Shopping Cart -->
  <ShoppingCart ref="cartRef" @update-stock="handleUpdateStock" :products="products" />

</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ProductListSearch from './components/ProductListSearch.vue';
  import ShoppingCart from './components/ShoppingCart.vue';

  /* Global product list to share with both components */
  const products = ref([
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

  // Reference to the ShoppingCart component to call its methods
  const cartRef = ref<InstanceType<typeof ShoppingCart> | null>(null);

  /** Function to handle the event when a product is added to cart
   * Calls the addItem method of the ShoppingCart component via ref
   * Also decreases the stock of the product in the products list
   * @param productId - ID of the product to add to cart
   */
  function handleAddToCart(productId: number) {
    // Call the addItem method in ShoppingCart component (the son component of this App.vue)
    cartRef.value?.addItem(productId);

    // We also decrease the stock in the products list
    const product = products.value.find(p => p.id === productId);

    if(product && product.stock > 0) {
      product.stock--;
    } else {
      alert('Product is out of stock!');
    }
  }

  /** Function to handle the event when stock needs to be updated
   * This is called from the ShoppingCart component when items are increased or decreased
   * @param payload - Object containing productId and the difference in stock (positive or negative)
   *  */
  function handleUpdateStock(payload: { productId: number; diff: number }) {
    const product = products.value.find(p => p.id === payload.productId);
    if(product) {
      product.stock += payload.diff;
    }
  }
  
</script>

<style scoped>
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
