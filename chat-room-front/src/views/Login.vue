<template>
    <div id="login">
        <Header v-bind:nav-buttons="navButtons" />
        <LoginForm v-on:login-attempt="login" v-bind:error-msg="errorMsg"/>
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
            user: null,
        }
    },
    methods: {
        login(userCredentials) {
            //Make a post request to the api.
            axios.post('http://localhost:3000/api/login', userCredentials)
                .then((res) => {
                    let data = res.data;

                    let username = data.user.username;
                    let token = data.token;
                    let expiresIn = data.expiresIn;

                    data = {
                        username: username,
                        token: token,
                        expiresIn: expiresIn,
                    }

                    //TODO store token
                    localStorage.setItem('user', JSON.stringify(data));

                    this.$router.push('/');
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
    },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'));

        if (this.user) {
            this.$router.push('/');
            return;
        }
    }
}
</script>

<style scoped>

</style>