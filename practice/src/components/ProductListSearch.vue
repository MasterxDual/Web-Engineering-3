<template>    
    <!-- Principal container with automatic margins -->
    <v-container>
        <!-- Grid system: row -->
    <v-row>
        <!-- Columns that occupies 12 columns (full width) -->
      <v-col cols="12">
        <h2>Product List</h2>
        <!-- Search input field -->
        <!-- label: placeholder
        clearable: allows deleting text
        mb-4: inferior margin -->
        <v-text-field
          v-model="searchQuery"
          label="Search products..." 
          clearable 
          class="mb-4"
        />
      </v-col>
    </v-row>
    <v-row v-if="filteredProducts.length === 0">
      <v-col cols="12">
        <!-- Message that appears if there's not any product found -->
        <v-alert type="info" text>No products found.</v-alert>
      </v-col>
    </v-row>
    <v-row>
        <!-- 1 columns: cols for movil, 2 columns: sm for tablets, 3 columns: md for desktops -->
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
      <!-- It gets darker if there's not stock -->
        <v-card :class="{ 'opacity-50': product.stock === 0 }" class="mb-4">
          <v-card-title>
            <!-- Link to the detail of the product -->
            <RouterLink :to="`/products/${product.id}`" class="product-name">{{ product.name }}</RouterLink>
          </v-card-title>
          <v-card-text>
            <div>Price: ${{ product.price }}</div>
            <div>
              Stock:
              <span v-if="product.stock > 0">{{ product.stock }}</span>
              <!-- Red chip if there's no stock -->
              <v-chip v-else color="red" dark>Out of Stock</v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="product.stock === 0"
              color="primary"
              @click="addToCart(product.id)"
            >
              Add to cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    
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
    .product-name {
        text-decoration: none;
        color: #1976d2;
        font-weight: 900;
    }

    button:hover {
        background: #0056b3;
    }

    button:disabled {
        background: #aaa;
        cursor: not-allowed;
    }

</style>