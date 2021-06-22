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
    getUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    chooseButtons() {
      if (this.user) {
        this.navButtons = [
          {
            title: 'Sign Out',
            link: null,
          }
        ];
        
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
    }
  },
  created() {
    //Populate the user variable.
    this.getUser();

    //Decide what buttons to print.
    this.chooseButtons();
  }
}
</script>
