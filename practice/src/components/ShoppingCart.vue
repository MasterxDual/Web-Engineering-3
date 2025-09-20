<template>
    <!-- Card container -->
  <v-card>
    <v-card-title>Shopping Cart</v-card-title>
    <v-card-text>
      <div v-if="cartItems.length === 0">
        <v-alert type="info" variant="text">Your cart is empty.</v-alert>
      </div>
      <v-list v-else>
        <!-- Iterates through cart items -->
        <v-list-item
          v-for="item in cartItems"
          :key="item.id"
        >
          <!-- Content to the left
          Avatar with the first letter of the item name -->
          <template #prepend>
            <v-avatar color="primary">
              {{ item.name.charAt(0) }}
            </v-avatar>
          </template>
          <v-list-item-title>
            {{ item.name }} (x{{ item.quantity }})
          </v-list-item-title>
          <v-list-item-subtitle>
            <!-- Formatted with two decimals -->
            ${{ item.subtotal.toFixed(2) }}
          </v-list-item-subtitle>
          <!-- Content to the right -->
          <template #append>
            <v-btn icon @click="decrease(item.id)">
              <!-- Icon of minus -->
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn icon @click="increase(item.id)">
              <!-- Icon of plus -->
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <!-- Total of the cart -->
      <div v-if="cartItems.length > 0" class="text-right mt-4">
        <strong>Total: ${{ totalPrice.toFixed(2) }}</strong>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
    import type { Product } from '@/types/Product';
    import type { Ref } from 'vue';
    import { inject, onMounted, onUnmounted } from 'vue';
    import { useCart } from '@/composables/useCart';
    import { addToCart, increaseCartItem, decreaseCartItem } from '@/services/cartService';

    // Inject products from parent component (App.vue) instead of using props
    const products = inject("products") as Ref<Product[]>;

    // We receive the global cart to update it when a product is added
    const cart = inject<Ref<{ id: number; quantity: number }[]>>('cart')!;

    // Emit event to update stock when item is added or removed from cart
    // This is sent to the parent component (App.vue) to update the stock in the global products list
    const emit = defineEmits<{
        (e: 'update-stock', payload: { productId: number; diff: number }): void
    }>();

    const { cartItems, totalPrice } = useCart(cart.value, products.value);

    /**
     * Function to add one unit of a product to the cart or increase its quantity if it already exists
     * This function is passed to the father component (App.vue) below
     * @param productId - ID of the product to add 
     * */ 
    function addItem(productId: number) {
     addToCart(cart.value, productId);
    }

    /**
     * Function to increase one unit of a product in the cart clicking the '+' button
     * This function is used in this component (Cart.vue) in the template
     * @param productId - ID of the product to increase
     *  */
    function increase(productId: number) {
      const ok = increaseCartItem(cart.value, products.value, productId);
      if(ok) {
        emit('update-stock', { productId, diff: -1 });
      } else {
        alert("There's no more stock available for this product.")
      }
    }

    /**
     * Function to decrease one unit of a product in the cart clicking the '-' button
     * This function is used in this component (Cart.vue) in the template
     * @param item - CartItem interface of the product to decrease
     *  */
    function decrease(productId: number) {
      decreaseCartItem(cart.value, productId);
      emit('update-stock', { productId, diff: +1 });
    }

    /* This happens when the component ShoppingCart appears on the DOM */
    onMounted(() => {
      console.log('ShoppingCart mounted!');
    });

    /* This happens when the component ShoppingCart disappears from the DOM */
    onUnmounted(() => {
      console.log('ShoppingCart unmounted!');
    });

    // Allows the parent component to access and use the addItem function
    defineExpose({ addItem })

</script>

<style scoped>
</style>