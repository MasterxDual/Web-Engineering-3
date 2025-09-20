import { computed } from 'vue';
import type { Product } from '@/types/Product';

export function useCart(cart: { id: number; quantity: number }[], products: Product[]) {
  /** computed property to automatically calculate every time cart.value or props.products changes
     * ...product copies all the properties of the product found in props.products
     * For every entry of the cart, searches the complete product in the list props.products
     * cartItems.value is the array of products with quantity, subtotal, name, id and price
     *  */ 
  const cartItems = computed(() =>
    cart.map(entry => {
      const product = products.find(p => p.id === entry.id)!;
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

  return {
    cartItems,
    totalPrice
  }
}