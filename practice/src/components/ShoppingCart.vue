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
    import { computed, inject } from 'vue';
    import type { Product } from '@/types/Product';
    import type { Ref } from 'vue';

    // Inject products from parent component (App.vue) instead of using props
    // const products = inject<Ref<Product[]>>('products')!;
    const products = inject("products") as Ref<Product[]>;

    // We receive the global cart to update it when a product is added
    const cart = inject<Ref<{ id: number; quantity: number }[]>>('cart')!;

    // Emit event to update stock when item is added or removed from cart
    // This is sent to the parent component (App.vue) to update the stock in the global products list
    const emit = defineEmits<{
        (e: 'update-stock', payload: { productId: number; diff: number }): void
    }>();

    /** computed property to automatically calculate every time cart.value or props.products changes
     * ...product copies all the properties of the product found in props.products
     * For every entry of the cart, searches the complete product in the list props.products
     * cartItems.value is the array of products with quantity, subtotal, name, id and price
     *  */ 
    const cartItems = computed(() =>
      cart.value.map(entry => {
        const product = products.value.find(p => p.id === entry.id)!;
        return {
          ...product,
          quantity: entry.quantity,
          subtotal: entry.quantity * product.price
        };
      })
    );

    // Calculates the total price of the cart using reduce method (initial value is 0) and iterates through cartItems until finished
    const totalPrice = computed(() =>
      cartItems.value.reduce((sum, item) => sum + item.subtotal, 0)
    );

    /**
     * Function to add one unit of a product to the cart or increase its quantity if it already exists
     * This function is passed to the father component (App.vue) below
     * @param productId - ID of the product to add 
     * */ 
    function addItem(productId: number) {
        const item = cart.value.find(i => i.id === productId);
        if (item) {
            item.quantity++;
        } else {
            cart.value.push({ id: productId, quantity: 1 });
        }
    }

    /**
     * Function to increase one unit of a product in the cart clicking the '+' button
     * This function is used in this component (Cart.vue) in the template
     * @param productId - ID of the product to increase
     *  */ 
    function increase(productId: number) {
      const cartItem = cart.value.find(i => i.id === productId);
      const product = products.value.find(p => p.id === productId);

      if (cartItem && product && product.stock > 0) {
        cartItem.quantity++;
        emit('update-stock', { productId, diff: -1 });
      } else if (product && product.stock <= 0) {
          alert("There's no more stock available for this product.")
      }
    }

    /**
     * Function to decrease one unit of a product in the cart clicking the '-' button
     * This function is used in this component (Cart.vue) in the template
     * @param item - CartItem interface of the product to decrease
     *  */
    function decrease(productId: number) {
      const cartItem = cart.value.find(i => i.id === productId);
      const product = products.value.find(p => p.id === productId);

      if (cartItem && product) {
        cartItem.quantity--;
        emit('update-stock', { productId, diff: +1 });

        if (cartItem.quantity <= 0) {
          cart.value = cart.value.filter(i => i.id !== productId);
        }
      } 
    }

    // Allows the parent component to access and use the addItem function
    defineExpose({ addItem })

</script>

<style scoped>
</style>