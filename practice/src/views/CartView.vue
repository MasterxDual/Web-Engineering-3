<template>
  <div>
    <h2>Shopping Cart</h2>
    <ShoppingCart :products="products" @update-stock="handleUpdateStock" />
  </div>
</template>

<script setup lang="ts">
    import ShoppingCart from '@/components/ShoppingCart.vue';
    import { inject } from 'vue';
    import type { Ref } from 'vue';
    import type { Product } from '@/types/Product';

    const products = inject("products") as Ref<Product[]>;

    /** Function to handle the event when stock needs to be updated
    * This is called from the ShoppingCart component when items are increased or decreased
    * @param payload - Object containing productId and the difference in stock (positive or negative)
    *  */
    function handleUpdateStock(payload: { productId: number; diff: number }) {
      const product = products.value.find((p: Product) => p.id === payload.productId);
      if (product) {
        product.stock += payload.diff;
      }
    }
</script>
