import type { AuthUser } from '@/types/AuthUser';
const STORAGE_KEY = 'auth-user';

/**
 * Sign in with the provided credentials.
 *
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<AuthUser>} A promise that resolves with the authenticated user if the credentials are valid,
 * or rejects with an error if they are not.
 *
 * @example
 * login('demo@demo.com', 'demo123')
 *   .then(user => console.log('Authenticated user:', user))
 *   .catch(err => console.error(err.message));
 */
export function login(email: string, password: string): Promise<AuthUser> {
  // Mock: only accepts user demo@demo.com / password demo123
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@demo.com' && password === 'demo123') {
        const user = { email };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1200);
  });
}

/**
 * Signs out the current user by removing their data from local storage.
 *
 * @returns {void}
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Gets the currently authenticated user from local storage.
 *
 * @returns {AuthUser | null} The authenticated user if it exists, or `null` if there is no active session.
 */
export function getCurrentUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}


// 
/**
 * Checks if there is an authenticated user.
 * !! converts the value returned by getCurrentUser() to a boolean
 * @returns {boolean} `true` if there is an authenticated user, `false` otherwise.
 */
export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}