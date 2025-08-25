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
                <h3>{{ product.name }}</h3>
                <p>Price: ${{ product.price }}</p>
                <p>
                    Stock:
                    <span v-if="product.stock > 0">In Stock: {{ product.stock }}</span>
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

    // Local list of products
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
    ])

    // Computed property to filter products based on search query (case-insensitive)
    // Computed works with reactive variables and updates automatically when they change
    const filteredProducts = computed(() => 
        products.value.filter((p) => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );

    function addToCart(productId: number) {
        const product = products.value.find(p => p.id === productId);
        if (product && product.stock > 0) {
            product.stock--;
            alert(`Added ${product.name} to cart!`);
        } else {
            alert('Product is out of stock!');
        }
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