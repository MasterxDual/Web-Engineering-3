import { createRouter, createWebHistory } from 'vue-router';
import RegisterClient from '@/components/RegisterClient.vue';
import ProductListSearch from '@/components/ProductListSearch.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';


// We define some routes for the application to access different components.
const routes = [
  { path: '/register', component: RegisterClient },
  { path: '/products', component: ProductListSearch },
  { path: '/cart', component: ShoppingCart }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
