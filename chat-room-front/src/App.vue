<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      getToken: 'getToken',
      
    }),
    ...mapActions({
      getUserFromServer: 'getUserFromServer',
    })
  },
  async created() {
    //This is a method that is going to be run when the app first is created.
    //Create an interceptor for any http error codes.
    this.$http.interceptors.response.use(undefined, async (err) => {
      try {
        //If the status of the http request is a 401, we want to log the user out.
        //Possibly also do some error handling.
        if (err.status === 401) {
          console.log(401);
          this.$store.dispatch('logout');
        }
      } catch (err) {
        console.error(err);
      }
    });

    if (this.isLoggedIn() && this.getToken() !== '') {
      //Set the authorization headers before sending any requests to the backend.
      this.$http.defaults.headers.common['Authorization'] = this.getToken();

      //Update the user object in the store.
      await this.getUserFromServer();
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

* {
  overflow: hidden;
}
</style>
