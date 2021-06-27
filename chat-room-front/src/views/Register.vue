<template>
    <div id="register">
        <Header v-bind:nav-buttons="navButtons"/>
        <RegisterForm v-on:register-user="registerUser"/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import RegisterForm from '@/components/RegisterForm.vue';

import axios from 'axios';

export default {
    name: 'Register',
    components: {
        Header,
        RegisterForm,
    },
    data() {
        return {
            navButtons: [
                {
                    title: 'Home',
                    link: '/',
                },
                {
                    title: 'Login',
                    link: '/login',
                },
            ],
            user: null,
        }
    },
    methods: {
        registerUser(newUser) {
            //Make the new user in the server.
            axios.post('http://localhost:3000/api/register', newUser)
                .then(async (res) => {
                    let data = res.data;

                    let expiresIn = data.expiresIn;
                    let token = data.token;
                    let username = data.user.username;

                    try {
                        //TODO Store the JWT token.
                        localStorage.setItem('user', JSON.stringify({
                            expiresIn: expiresIn,
                            token: token,
                            username: username,
                        }))

                        this.$router.push('/');

                    } catch (err) {
                        console.error(err);
                    }
                })
                .catch((err) => {
                    let res = err.response;

                    if (res.status === 409) {
                        //TODO make an actual error.
                        console.error('Username taken');

                        // this.$router.go();

                        return;
                    }

                    console.error(err);
                });
        },
    },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'));

        if (this.user) {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
    
</style>