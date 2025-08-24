<!-- Al utilizar v-model: sincroniza el valor actual reactivo directamente en el input ingresando 
la variable sin el value y también en el archivo script usando el value -->

<template>
    <div class="container">
        <div class="form-wrapper">
            <label for="name">Complete name:</label>
            <input id="name" type="text" v-model="completeName" placeholder="Enter your complete name"/>
            <button @click="sayHello">Say Hi</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const completeName = ref('');

    function sayHello() {
        if(completeName.value) {
            alert("Welcome to our website");
            console.log("Se ha guardado el nombre completo del cliente: " + completeName.value + " en la base de datos.");
        } else {
            alert("Please enter your complete name");
        }
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

