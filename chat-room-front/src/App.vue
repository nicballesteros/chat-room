<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      getToken: 'getToken',
    })
  },
  created() {
    this.$http.interceptors.response.use(undefined, async (err) => {
      try {
        if (err.status === 401) {
          console.log(401);
          this.$store.dispatch('logout');
        }
      } catch (err) {
        console.error(err);
      }
    });

    if (this.isLoggedIn() && this.getToken() !== '') {
      this.$http.defaults.headers.common['Authorization'] = this.getToken();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: max-content;
}
</style>
