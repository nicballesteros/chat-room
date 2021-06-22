<template>
    <div id="header">
        <div class="header-col">
            <div id="logo-container">
                <img src="../assets/logo.png" id="logo">
            </div>
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
            //Signout check
            if (link == null) {
                localStorage.setItem('user', null);
                this.$router.push('/login');
                return;
            }

            //all other buttons should just push on router.
            this.$router.push(link);
        },
    },
    data() {
        return {
            loginButtonText: 'login',
        }
    },
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
 
    #logo-container {
        height: 100%;
        width: 100%;
        /* text-align: left; */
    }

    #logo {
        margin: 16px;
        max-height: 100%;
        width: 50px;
        float: left;
    }

    button {
        margin: 12px;
    }

    .header-col {
        flex: 1;
    }
</style>