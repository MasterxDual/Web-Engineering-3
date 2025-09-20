<template>
  <v-container>
    <ProductListSearch :products="products" @add-to-cart="handleAddToCart" />
  </v-container>
</template>

<script setup lang="ts">
    import { inject} from 'vue';
    import ProductListSearch from '@/components/ProductListSearch.vue';
    import type { Ref } from 'vue';
    import type { Product } from '@/types/Product';
    import { decreaseStock } from '@/services/productService';

    // We receive the global products list from the parent component (App.vue)
    const products = inject("products") as Ref<Product[]>;

    // We receive the global cart to update it when a product is added
    const cart = inject<Ref<{ id: number; quantity: number }[]>>('cart')!;
    
    
    /** Function to handle the event when a product is added to cart
     * Calls the addItem method of the ShoppingCart component via ref
     * Also decreases the stock of the product in the products list
     * @param productId - ID of the product to add to cart
     */
    function handleAddToCart(productId: number) {
      // We use the cart item of the parent component (App.vue) directly here (global cart item)
      const cartItem = cart.value.find(i => i.id === productId);

      if(cartItem) cartItem.quantity++;
      else cart.value.push({ id: productId, quantity: 1 });
      
      decreaseStock(products.value, productId);

    }

</script>
