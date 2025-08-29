<template>
    <div class="cart">
        <p v-if="cartItems.length === 0" class="empty-cart">Your cart is empty.</p>

        <!-- Cart list (it's an unordened list) -->
        <ul v-else class="cart-list">
            <li v-for="item in cartItems" :key="item.id" class="cart-item">
                <!-- Cart item information -->
                <div class="item-info">
                    <span class="item-name">{{ item.name }} (x{{ item.quantity }})</span>
                    <span class="item-price"> ${{ item.subtotal.toFixed(2) }}</span>
                </div>
                <!-- Controls to increase or decrease the quantity of stock -->
                <div class="controls">
                    <button @click="decrease(item.id)">-</button>
                    <button @click="increase(item.id)">+</button>
                </div>
            </li>
        </ul>

        <h3 v-if="cartItems.length > 0" class="cart-total">
            Total: ${{ totalPrice.toFixed(2) }}
        </h3>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';


    // Interface to define the structure of a product
    interface Product {
        id: number; 
        name: string;
        price: number;
        stock: number;
    }

    // Props is necessary to receive the products list from parent component (App.vue)
    const props = defineProps<{
        products: Product[];
    }>();

    // Reactive variable to store the cart items
    const cart = ref<{ id: number; quantity: number }[]>([]);

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
        const product = props.products.find(p => p.id === entry.id)!;
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
      const product = props.products.find(p => p.id === productId);

      if (cartItem && product && product.stock > 0) {
        cartItem.quantity++;
        emit('update-stock', { productId, diff: -1 });
      }
    }


    /**
     * Function to decrease one unit of a product in the cart clicking the '-' button
     * This function is used in this component (Cart.vue) in the template
     * @param item - CartItem interface of the product to decrease
     *  */
    function decrease(productId: number) {
      const cartItem = cart.value.find(i => i.id === productId);
      const product = props.products.find(p => p.id === productId);

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

    .cart {
        background: #fdfdfd;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: auto;
        flex: 1;
    }

    .empty-cart {
        color: #888;
        text-align: center;
        font-style: italic;
    }

    .cart-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fafafa;
        padding: 0.6rem;
        margin-bottom: 0.6rem;
        border-radius: 8px;
        flex-wrap: wrap;
    }

    .item-info {
        display: flex;
        flex-direction: column;
        font-size: 0.95rem;
    }

    .item-name {
        font-weight: 600;
        color: #333;
    }

    .item-price {
        color: #007bff;
    }

    .controls {
        display: flex;
        gap: 0.4rem;
        margin-top: 0.4rem;
    }

    .controls button {
        padding: 0.4rem 0.8rem;
        border: none;
        border-radius: 6px;
        background: #007bff;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s;
    }

    .controls button:hover {
        background: #0056b3;
    }

    .cart-total {
        margin-top: 1rem;
        text-align: right;
        color: #222;
        font-weight: bold;
    }

    @media (max-width: 480px) {
        .cart {
            max-width: 100%;
            padding: 0.8rem;
        }

        .cart-item {
            flex-direction: column;
            align-items: flex-start;
        }

        .controls {
            margin-top: 0.5rem;
            width: 100%;
            justify-content: flex-end;
        }

        .controls button {
            flex: 1; /* Buttons grow in mobile */
        }

    }

</style>