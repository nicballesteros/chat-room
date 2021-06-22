<template>
  <div class="home">
    <Header v-bind:nav-buttons="this.navButtons" id="header"/>

    <div id="message-wrapper">
      <MessageBoard v-if="this.user != null" v-bind:user="this.user" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import MessageBoard from "@/components/MessageBoard.vue";

import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header,
    MessageBoard,
  }, 
  data() {
    return {
      navButtons: [],
      user: null,
    }
  },
  methods: {
      
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user) {
      this.navButtons = [
        {
          title: 'Sign Out',
          link: null,
        }
      ];
      
      axios.get('http://localhost:3000/api/protected', {
        headers: {
          Authorization: this.user.token,
        }
      }).then((res) => {
        console.log(res);
      });

      return;
    }

    this.navButtons = [
      {
        title: 'Login',
        link: '/login',
      }, 
      {
        title: 'Register',
        link: '/register',
      }
    ];
    
  },
}
</script>

<style scoped>
  .home {
    display: flex;
    flex-flow: column;
    height: 100vh;
  }

  #header {
    margin: 12px;
    margin-bottom: 6px;
  }

  #message-wrapper {
    flex: 1;
    
    display: flex;
    flex-flow: column;
    align-items: stretch;

    margin: 12px;

    margin-top: 6px;
  }
</style>
