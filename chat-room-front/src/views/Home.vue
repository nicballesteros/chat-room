<template>
  <div class="home">
    <NewMessageModal 
      v-if="this.isNewMessageModalVisible"
      v-on:close-modal="this.handleNewThreadClose"
      v-on:new-thread="this.handleNewThreadSubmit"  
    />

    <Header v-bind:nav-buttons="this.navButtons" id="header"/>

    <div id="message-wrapper">
      <MessageBoard 
        v-if="this.isLoggedIn()" 
        v-bind:user="this.getUser()"
        v-on:new-thread-click="handleNewThread"
        :key="this.key"
      />

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import MessageBoard from "@/components/MessageBoard.vue";

import NewMessageModal from "@/components/NewMessageModal.vue";

import { createNewThread } from '@/api/util';

import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Header,
    MessageBoard,
    NewMessageModal,
  }, 
  data() {
    return {
      navButtons: [],
      user: null,
      isNewMessageModalVisible: false,
      key: 0, //Used to reload the page. Lil hack.
    }
  },
  methods: {
      handleNewThread() {
        this.isNewMessageModalVisible = true;
      },
      handleNewThreadClose() {
        this.isNewMessageModalVisible = false;
      },
      async handleNewThreadSubmit(usernames) {
        try {
          let res = await createNewThread(usernames);

          if (res) {
            this.key++;
            return;
          }

          //TODO show an error message that the thread was not created.
        } catch (err) {
          console.error(err);
        }
      },
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        getUser: 'getUser',
      }),
  },
  created() {
    //Check to see if the user is already logged in.
    if (this.isLoggedIn()) {
      //If so, show sign out button only.
        this.navButtons = [
        {
          title: 'Sign Out',
          link: '/logout',
        }
      ];
      
      //Get the current open message threads the user owns.
      // axios.get('http://localhost:3000/api/protected', {
      //   headers: {
      //     Authorization: this.user.token,
      //   }
      // }).then((res) => {
      //   console.log(res);
      // });

      return;
    }

    //Else show the login and register page buttons.
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
