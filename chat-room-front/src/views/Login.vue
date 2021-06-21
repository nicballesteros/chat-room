<template>
    <div id="login">
        <Header v-bind:nav-buttons="navButtons" />
        <h1>Login</h1>
    </div>

</template>

<script>
import Header from '@/components/Header.vue';

export default {
    name: 'Login',
    components: {
        Header,
    },
    data() {
        return {
            navButtons: [{
                title: 'Home',
                link: '/',
            },{
                title: 'Register',
                link: '/register',        
            }
            ]
        }
    }
}
</script>

<style scoped>

</style>