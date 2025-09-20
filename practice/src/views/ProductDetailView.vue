<template>
  <v-container>
    <v-card v-if="product">
      <v-card-title class="product-name">{{ product.name }}</v-card-title>
      <v-card-text>
        <div>Price: ${{ product.price }}</div>
        <div v-if="product.stock > 0">Actual stock: {{ product.stock }}</div>
        <v-chip v-else color="red" dark>Out of stock</v-chip>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goBack" color="primary">Back to products</v-btn>
      </v-card-actions>
    </v-card>
    <v-alert v-else type="error">
      Product not found
      <v-btn @click="goBack" color="primary">Back</v-btn>
    </v-alert>
  </v-container>
</template>


<script setup lang="ts">
    import { inject } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import type { Ref } from 'vue';
    import type { Product } from '@/types/Product';

    // Inject products from parent component (App.vue) instead of using props
    // const products = inject<Ref<Product[]>>('products')!;
    const products = inject("products") as Ref<Product[]>;

    const route = useRoute();
    const router = useRouter();

    const productId = Number(route.params.id);
    const product = products.value.find((p: Product) => p.id === productId);



    function goBack() {
      router.push("/products");
    }
</script>

<style scoped>
  .product-name {
        text-decoration: none;
        color: #1976d2;
        font-weight: 900;
    }
</style>