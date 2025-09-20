import type { Product } from "@/types/Product";

/**
* Function to add one unit of a product to the cart or increase its quantity if it already exists
* This function is used in this component (ShoppingCart.vue) in the template and passed to the father component (App.vue)
* @param cart - array of cart items with id and quantity
* @param productId - ID of the product to add 
*  */
export function addToCart(cart: { id: number; quantity: number }[], productId: number) {
  const item = cart.find(i => i.id === productId);
  if (item) item.quantity++;
  else cart.push({ id: productId, quantity: 1 });
}

/**
* Function to increase one unit of a product in the cart clicking the '+' button
* This function is used in this component (Cart.vue) in the template
* @param productId - ID of the product to increase
* @param cart - array of cart items with id and quantity
* @param products - array of products with id, name, price and stock
* @returns boolean - true if the product was increased, false if not (stock is 0)
*  */ 
export function increaseCartItem(cart: { id: number; quantity: number }[], products: Product[], productId: number): boolean {
  const cartItem = cart.find(i => i.id === productId);
  const product = products.find(p => p.id === productId);

  if (cartItem && product && product.stock > 0) {
    cartItem.quantity++;
    return true;
  } else if (product && product.stock <= 0) {
    return false;
  }
  return false;
}

/**
* Function to decrease one unit of a product in the cart clicking the '-' button
* This function is used in this component (Cart.vue) in the template
* @param cart - array of cart items with id and quantity
* @param products - array of products with id, name, price and stock
* @param productId - ID of the product to decrease
*  */
export function decreaseCartItem(cart: { id: number; quantity: number }[], productId: number) {
  const cartItem = cart.find(i => i.id === productId);

  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity <= 0) {
      const idx = cart.indexOf(cartItem);
      if (idx !== -1) cart.splice(idx, 1);
    }
  }
}
