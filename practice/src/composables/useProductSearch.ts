import { ref, computed } from 'vue';
import type { Product } from '@/types/Product';

export function useProductSearch(products: Product[]) {
  const searchQuery = ref('');

  // Computed property to filter products based on search query (case-insensitive)
  // Computed works with reactive variables and updates automatically when they change
  const filteredProducts = computed(() =>
    products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  return {
    searchQuery,
    filteredProducts
  }
}