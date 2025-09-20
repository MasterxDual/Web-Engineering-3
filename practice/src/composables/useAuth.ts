import { ref } from 'vue';
import { getCurrentUser, login, logout } from '@/services/authService';
import type { AuthUser } from '@/types/AuthUser';

const user = ref<AuthUser | null>(getCurrentUser());

/**
 * Composable for managing user authentication.
 * 
 * Provides reactive state for the current user and utility functions
 * for login, logout, and restoring session from local storage.
 * 
 * @returns {{
 *   user: import('vue').Ref<AuthUser | null>,
 *   doLogin: (email: string, password: string) => Promise<void>,
 *   doLogout: () => void,
 *   restore: () => void,
 *   isAuthenticated: () => boolean
 * }} Object with authentication-related state and methods.
 * 
 * @example
 * // Basic usage
 * const { user, doLogin, doLogout, isAuthenticated } = useAuth();
 *
 * // Login user
 * await doLogin('demo@demo.com', 'demo123');
 * console.log(user.value); // { email: 'demo@demo.com' }
 *
 * // Logout user
 * doLogout();
 * console.log(isAuthenticated()); // false
 * 
 * @example
 * // Restore session on app startup
 * const { restore, isAuthenticated } = useAuth();
 * restore();
 * 
 * if (isAuthenticated()) {
 *   // User is logged in, proceed to main app
 * } else {
 *   // Redirect to login
 * }
 */
export function useAuth() {
     /**
    * Sets the current user state and updates local storage accordingly.
    * @param {AuthUser | null} u - The user object or null to clear authentication.
    * @private
    */
    function setUser(u: AuthUser | null) {
      user.value = u;
      if (!u) logout();
    }

    /**
    * Performs user login with email and password credentials.
    * @async
    * @param {string} email - User's email address.
    * @param {string} password - User's password.
    * @returns {Promise<void>}
    * @throws {Error} If credentials are invalid or login fails.
    * 
    * @example
    * try {
    *   await doLogin('user@example.com', 'password123');
    *   // Login successful
    * } catch (error) {
    *   // Handle login error
    * }
    */
    async function doLogin(email: string, password: string) {
      const u = await login(email, password);
      setUser(u);
    }

    /**
    * Logs out the current user and clears authentication state.
    * 
    * @example
    * doLogout();
    * // User is now logged out and redirected to login page
    */
    function doLogout() {
      setUser(null);
    }

    /**
    * Restores user authentication state from local storage.
    * Useful for persisting sessions across page refreshes.
    * 
    * @example
    * // Call on application initialization
    * restore();
    * if (isAuthenticated()) {
    *   // User session restored
    * }
    */
    function restore() {
      user.value = getCurrentUser();
    }

    return {
      user,
      doLogin,
      doLogout,
      restore,
      isAuthenticated: () => !!user.value
    };
}