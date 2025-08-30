<template>
  <div v-if="product">
    <h2>{{ product.name }}</h2>
    <p>Price: ${{ product.price }}</p>
    <p v-if="product.stock > 0">Actual stock: {{ product.stock }}</p>
    <p v-else style="color:red;">Out of stock</p>

    <button @click="goBack">Back to products</button>
  </div>
  <div v-else>
    <p style="color:red;">Product not found</p>
    <button @click="goBack">Back</button>
  </div>
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
