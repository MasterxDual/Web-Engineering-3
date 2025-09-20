<!-- Al utilizar v-model: sincroniza el valor actual reactivo directamente en el input ingresando 
la variable sin el value y también en el archivo script usando el value -->


<template>
  <v-container>
    <!-- Centers horizontally the three components-->
    <v-row justify="center">
        <!-- Responsive design -->
      <v-col cols="12" sm="8" md="6">
        <!-- Card that contains the form to register the client-->
        <v-card>
          <v-card-title>Register Client</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="completeName"
              label="Complete name"
              :error="completeName.length < 3 && completeName.length > 0"
              :success="completeName.length >= 3"
              placeholder="Enter your complete name"
              @click:clear="completeName = ''"
              clearable
            />
            <v-btn :disabled="completeName.length < 3" color="primary" @click="sayHello">
              Register
            </v-btn>
            <v-alert v-if="completeName.length < 3 && completeName.length > 0" type="error" class="mt-2">
              Please enter at least 3 characters
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const completeName = ref('');

    function sayHello() {
        alert("Welcome to our website " + completeName.value);
        console.log("Se ha guardado el nombre completo del cliente: " + completeName.value + " en la base de datos.");
    }
</script>

<style lang="css">
    /* It's better to use rem for font-sizes, paddings, margins and gaps  */
    body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        /* Occupies the entire screen */
        height: 100vh; 
        background-color: #f0f0f0;
    }
    .form-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        /* We adjust the maximum to make a better view of the form */
        max-width: 400px;
    }
    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        /* It makes a slower transition */
        transition: border-color 0.3s;
    }

    input:focus {
        border-color: #007BFF;
        outline: none;
    }

    button {
        padding: 0.75rem;
        background-color: #007BFF;
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #0056b3;
    }

    .error-validation {
        border: 2px solid red;
    }

    .success-validation {
        border: 2px solid green !important; /* We use !important to override the focus style */
    }

    @media (max-width: 480px) {
        .form-wrapper {
            padding: 1.5rem;
        }

        input, button {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 200px) {
        .form-wrapper {
            padding: 0.5rem;
        }

        input, button {
            font-size: 0.5rem;
        }
    }

</style>

