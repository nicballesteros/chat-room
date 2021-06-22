<template>
  <div class="home">
    <Header v-bind:nav-buttons="this.navButtons" />
    <div v-if="this.user != null">
        Welcome @{{user.username}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header,
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
