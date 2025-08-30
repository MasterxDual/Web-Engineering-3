<template>
    <div class="home-container">
        <h2>Welcome to the store</h2>
        <p>Explore our products or register a client</p>
    </div>
</template>

<style scoped>
    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        min-height: 60vh;
        font-family: Arial, sans-serif;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
    }

    @media (max-width: 480px) {
        .home-container {
            padding: 1rem;
        }

        h2 {
            font-size: 1.3rem;
        }

        p {
            font-size: 0.9rem;
        }
    }
</style>