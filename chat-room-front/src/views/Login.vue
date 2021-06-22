<template>
    <div id="login">
        <Header v-bind:nav-buttons="navButtons" />
        <LoginForm v-on:login-event="login" v-bind:error-msg="errorMsg"/>
    </div>

</template>

<script>
import Header from '@/components/Header.vue';
import LoginForm from "@/components/LoginForm.vue";

import axios from "axios";

export default {
    name: 'Login',
    components: {
        Header,
        LoginForm,
    },
    data() {
        return {
            navButtons: [
                {
                    title: 'Home',
                    link: '/',
                },
                {
                    title: 'Register',
                    link: '/register',        
                }
            ],
            errorMsg: null,
        }
    },
    methods: {
        login(userCredentials) {
            //Make a post request to the api.
            axios.post('http://localhost:3000/api/login', userCredentials)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        this.errorMsg = "Login Failed";
                        console.log(this.errorMsg);
                        return;
                    }
                    
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>

</style>