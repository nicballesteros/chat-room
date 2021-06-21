<template>
  <div class="home">
    <Header v-bind:nav-buttons="this.navButtons" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: 'Home',
  components: {
    Header,
  }, 
  data() {
    return {
      navButtons: [{
        title: 'Login',
        link: '/login',
      }, {
        title: 'Register',
        link: '/register',
      }],
    }
  }
}
</script>
