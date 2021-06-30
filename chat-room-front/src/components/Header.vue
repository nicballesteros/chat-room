<template>
    <div id="header">
        <div class="header-col">
            <div id="logo-container">
                <img src="../assets/logo.png" id="logo" @click="handleButtonClick('/')">
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
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Header",
    props: {
        navButtons: {
            type: Array,
        },
    },
    methods: {
        async handleButtonClick(link) {
            //Check we are not going to the same page that we are already on.
            if (this.$router.currentRoute.path === link) {
                return;
            }

            //If the link is to logout, check if the user can be logged out.
            if (link == '/logout') {
                if (this.isLoggedIn()) {
                    await this.logout();
                }

                this.$router.push('/login');
                return;
            }

            //This is to avoid triggering the Navigation Guard put in place
            //by the router if a user is logged in.
            if (link === '/login' || link === '/register') {
                if (this.isLoggedIn()) {
                    return;
                }
            }

            this.$router.push(link);
        },
        ...mapGetters({
            isLoggedIn: 'isLoggedIn',
            getUser: 'getUser',
        }),
        ...mapActions({
            logout: 'logout',
        })
    },
    data() {
        return {
            loginButtonText: '/login',
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