<template>
    <div id="header">
        <div class="header-col" id="logo-container">
            <img src="../assets/logo.png" id="logo">
        </div>
        <div class="header-col" id="name-container-parent">
            <div id="name-container">
                <h1>Chat Room</h1>
            </div>
        </div>
        <div class="header-col" id="login-container">
            <button v-for="( button, index ) in navButtons" :key="index" @click="handleButtonClick(button.link)">
                {{ button.title }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        navButtons: {
            type: Array,
        },
    },
    methods: {
        handleButtonClick(link) {
            this.$router.push(link);
        },
    },
    data() {
        return {
            loginButtonText: 'login',
        }
    },
    created() {
    }
}
</script>

<style scoped>
    #header {
        border: 1px none #000;
        border-radius: 10px;
        background-color: #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #logo {
        margin: 16px;
        max-height: 100%;
        width: 50px;
    }

    #login-container {
        margin: 16px;
    }

    button {
        margin: 12px;
    }


    /* #login-btn {
        text-decoration: none;
    } */
</style>