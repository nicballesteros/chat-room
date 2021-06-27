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
        v-if="this.user != null" 
        v-bind:user="this.user"
        v-on:new-thread-click="handleNewThread"
        v-bind:key="this.key"
      />

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import MessageBoard from "@/components/MessageBoard.vue";

import NewMessageModal from "@/components/NewMessageModal.vue";

import axios from 'axios';

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
      key: 0,
    }
  },
  methods: {
      handleNewThread() {
        this.isNewMessageModalVisible = true;
      },
      handleNewThreadClose() {
        this.isNewMessageModalVisible = false;
      },
      handleNewThreadSubmit(usernames) {
        //Tell the server a new thread is to be created.
        axios.post('http://localhost:3000/api/user/newthread', {
          usernames: usernames,
        }, {
          headers: {
            Authorization: this.user.token,
          }
        }).then((res) => {
          console.log(res);
          this.key++;
        });
      },
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
