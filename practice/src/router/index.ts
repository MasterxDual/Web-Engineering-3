import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductsView from '@/views/ProductsView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import ClientsView from '@/views/ClientsView.vue';
import CartView from '@/views/CartView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/products', component: ProductsView },
    { path: '/products/:id', component: ProductDetailView },
    { path: '/clients', component: ClientsView },
    { path: '/cart', component: CartView }
  ],
  scrollBehavior() { // Defines scroll behavior on route change
    return { top: 0 }; // Always scroll to top on route change
  },
});

export default router;
