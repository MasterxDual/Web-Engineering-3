import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductsView from '@/views/ProductsView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import ClientsView from '@/views/ClientsView.vue';
import CartView from '@/views/CartView.vue';
import LoginView from '@/views/LoginView.vue';
import { isAuthenticated } from '@/services/authService';

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/products', component: ProductsView, meta: { requiresAuth: true } },
  { path: '/products/:id', component: ProductDetailView, meta: { requiresAuth: true } },
  { path: '/clients', component: ClientsView, meta: { requiresAuth: true } },
  { path: '/cart', component: CartView, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() { return { top: 0 }; },
});


/**
 * Global guard to protect routes that require authentication.
 * If the route requires authentication and the user is not authenticated,
 * the user is redirected to the login page.
 * If the user is already authenticated and tries to log in, they are redirected home.
 * to: destination route (where the user wants to go)
 * from: source route (where the user came from)
 * next: function to continue or redirect navigation
*/ 
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();
  if (to.meta.requiresAuth && !isAuth) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.path === '/login' && isAuth) {
    next('/');
  } else {
    next();
  }
});

export default router;