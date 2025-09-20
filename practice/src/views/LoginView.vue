<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" elevation="8" rounded="2xl" max-width="400">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            aria-label="Email"
            type="email"
            :rules="emailRules"
            required
            clearable
            :aria-invalid="emailError"
            :error="emailError"
            autocomplete="username"
            class="mb-3"
          />
          <v-text-field
            v-model="password"
            label="Contraseña"
            aria-label="Contraseña"
            type="password"
            :rules="passwordRules"
            required
            clearable
            :aria-invalid="passwordError"
            :error="passwordError"
            autocomplete="current-password"
            class="mb-4"
          />
          <v-alert v-if="errorMsg" type="error" class="mb-4" aria-live="assertive">{{ errorMsg }}</v-alert>
          <v-btn
            color="primary"
            :disabled="!valid || loading"
            @click="onLogin"
            block
          >
            <span v-if="!loading">Ingresar</span>
            <v-progress-circular v-else indeterminate size="20" color="white" />
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth } from '@/composables/useAuth';

  const email = ref('');
  const password = ref('');
  const errorMsg = ref('');

  /**
  * Loading status during the login process
  */
  const loading = ref(false);

  /**
  * Full form validation state
  * Automatically updated by the v-form component
  */
  const valid = ref(false);

  /**
  * Validation rules for the email field
  * @example
  * Returns true if valid, string with error message if not
  */
  const emailRules = [
    (v: string) => !!v || 'Email requerido',
    (v: string) => /^\S+@\S+\.\S+$/.test(v) || 'Formato de email inválido',
  ];

  /**
 * Computed error state for the password field
 * @returns {boolean|undefined} true if error, undefined if field is empty
 */
  const passwordRules = [
    (v: string) => !!v || 'Contraseña requerida',
    (v: string) => v.length >= 6 || 'Mínimo 6 caracteres',
  ];

  /**
  * Computed error state for the email field
  * @returns {boolean|undefined} true if error, undefined if field is empty
  */
  const emailError = computed(() => {
    if (!email.value) return undefined;
    return !emailRules.every(r => r(email.value) === true);
  });

  /**
  * Computed error state for the password field
  * @returns {boolean|undefined} true if error, undefined if field is empty
  */
  const passwordError = computed(() => {
    if (!password.value) return undefined;
    return !passwordRules.every(r => r(password.value) === true);
  });

  const router = useRouter();
  const { doLogin } = useAuth();

  /**
 * Handles the user login process
 * @async
 * @function onLogin
 * @returns {Promise<void>}
 * @throws {Error} Invalid credentials error or other authentication errors
 * 
 * @example
 * // Example of use:
 * await onLogin();
 * 
 * @description
 * 1. Clears previous error messages
 * 2. Activates the loading state
 * 3. Attempts to log in with credentials
 * 4. Redirects to the home page if successful
 * 5. Handles errors and displays appropriate messages
 * 6. Always disables loading upon completion
 */
  async function onLogin() {
    errorMsg.value = '';
    loading.value = true;
    try {
      await doLogin(email.value, password.value);
      router.replace('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorMsg.value = e.message;
      } else {
        errorMsg.value = 'Error de login';
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped>
  .v-card {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
</style>