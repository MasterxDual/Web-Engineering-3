<template>
    <div class="container">
        <h2>Product List</h2>

        <!-- Input search -->
        <input type="text" v-model="searchQuery" placeholder="Search products..." class="search-input"/>
        
        <!-- Empty state if not products found -->
        <p v-if="filteredProducts.length === 0" class="empty-state">No products found.</p>
        
        <!-- Product List -->
        <div class="product-list">
            <!-- v-for makes the list searched by input search, otherwise makes the complete local list -->
            <div
                v-for="product in filteredProducts" 
                :key="product.id"
                class="product-card"
                :class="{ 'out-of-stock': product.stock === 0 }">
                <!-- This allows to navigate to the product detail page when clicked on the name of the product shown in the product list -->
                <h3><RouterLink :to="`/products/${product.id}`" class="product-name">{{ product.name }}</RouterLink></h3>
                <p>Price: ${{ product.price }}</p>
                <p>
                    Stock:
                    <span v-if="product.stock > 0">{{ product.stock }}</span>
                    <span class="out-of-stock-span" v-else>Out of Stock</span>
                </p>
                <button :disabled="product.stock === 0" @click="addToCart(product.id)">Add to cart</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    const searchQuery = ref('');

    // We define the emit event to notify parent component when a product is added to cart
    const emit = defineEmits<{
        (e: 'add-to-cart', productId: number): void
    }>();

    const productProps = defineProps<{
        products: { id: number; name: string; price: number; stock: number }[];
    }>();

    // Computed property to filter products based on search query (case-insensitive)
    // Computed works with reactive variables and updates automatically when they change
    const filteredProducts = computed(() => 
        productProps.products.filter((p) => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );

    /** Function that emits the event to parent component when a product is added to cart
     * 
     *  */ 
    function addToCart(productId: number) {
        emit('add-to-cart', productId);
    }
    
</script>

<style scoped>
    .container {
        max-width: 1200px;
        width: 100%;
        margin: auto;
        padding: 1rem;
        /* We make search-input in the top and product-list to the bottom */
        display: flex;
        flex-direction: column;
    }
    .search-input {
        width: 100%;
        padding: 0.6rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .empty-state {
        color: #888;
        font-style: italic;
        margin-top: 1rem;
    }
    .product-list {
        /* We make the product list responsive and situated in rows */
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding-top: 0;
    }

    .product-card {
        background: #f9f9f9;
        border-radius: 12px;
        padding: 1rem;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        flex: 1 1 180px; /* Flex-grow, flex-shrink, flex-basis */
    }

    .product-card:hover {
        transform: scale(1.02);
    }

    .product-name {
        text-decoration: none;
        color: #007bff;
        font-weight: 900;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.6rem 1 rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
    button:disabled {
        background: #aaa;
        cursor: not-allowed;
    }

    /* If the class is added if product is out of stock then turns opacity to 0.6 to all product-cards*/
    .out-of-stock {
        opacity: 0.6;
    }

    /* We draw a rectangule inside Out of Stock text */
    .out-of-stock-span {
        color: white;
        font-weight: bold;
        background-color: red;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-weight: bold;
    }

    @media (max-width: 480px) {
        .search-input {
            font-size: 14px;
            padding: 0.5rem;
        }
        .product-card {
            padding: 0.8rem;
        }
    
        button {
            font-size: 14px;
            padding: 0.5rem;
        }
    }


</style>