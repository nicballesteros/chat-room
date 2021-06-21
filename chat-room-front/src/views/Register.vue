<template>
    <div id="register">
        <Header v-bind:nav-buttons="navButtons"/>
        Register
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    name: 'Register',
    components: {
        Header,
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
                
            ]
        }
    }
}
</script>

<style scoped>

</style>