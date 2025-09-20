import type { Product } from '@/types/Product';

/**
 * Function to decrease the stock of a product by 1 if stock > 0
 * @param products - array of products with id, name, price and stock
 * @param productId - ID of the product to decrease stock
 * If stock is 0, an alert is shown
 *  */
export function decreaseStock(products: Product[], productId: number) {
  const product = products.find(p => p.id === productId);
  if (product && product.stock > 0) product.stock--;
  else alert("Product is out of stock!");
}

/** Function to increase the stock of a product by 1
 * @param products - array of products with id, name, price and stock
 * @param productId - ID of the product to increase stock
 *  */
export function increaseStock(products: Product[], productId: number) {
  const product = products.find(p => p.id === productId);
  if (product) product.stock++;
}