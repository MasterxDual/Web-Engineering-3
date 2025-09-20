<template>
  <v-container>
    <h2>Shopping Cart</h2>
    <ShoppingCart :products="products" @update-stock="handleUpdateStock" />
  </v-container>
</template>

<script setup lang="ts">
    import ShoppingCart from '@/components/ShoppingCart.vue';
    import { inject } from 'vue';
    import type { Ref } from 'vue';
    import type { Product } from '@/types/Product';
    import { decreaseStock, increaseStock } from '@/services/productService';

    const products = inject("products") as Ref<Product[]>;

    /** Function to handle the event when stock needs to be updated
    * This is called from the ShoppingCart component when items are increased or decreased
    * @param payload - Object containing productId and the difference in stock (positive or negative)
    *  */
    function handleUpdateStock(payload: { productId: number; diff: number }) {
      if (payload.diff > 0) {
        // Si diff es positivo, aumentar el stock
        increaseStock(products.value, payload.productId);
      } else if (payload.diff < 0) {
        // Si diff es negativo, disminuir el stock
        decreaseStock(products.value, payload.productId);
      }
    }
</script>
