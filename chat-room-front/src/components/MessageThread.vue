<template>
    <div id="message-thread-root">
        <div id="threads">
            <div 
            class="thread"
            :key="thread.id" 
            v-for="thread in threads" 
            v-on:click="messageThreadClick(thread._id)">
                
                <h4 
                class="thread-text">
                    {{thread.title}}
                </h4>

                <p 
                v-if="thread.lastMsg != null" 
                class="thread-text message-text">
                    {{`${thread.lastMsg.user}: ${thread.lastMsg.message}`}}
                </p>

                <p 
                v-if="thread.lastMsg == null" 
                class="thread-text message-text">
                    Send a Message!
                </p>
            </div>
        </div>
        <div v-on:click="newThread" id="new-thread-container">
            <div id="new-thread">
                <add-icon  id="addIcon" title="New Message" :size="20"/>
            </div>
        </div>
    </div>
</template>

<script>
import AddIcon from 'vue-material-design-icons/Plus.vue';

import { getThreads } from '@/api/util';

getThreads.bind(this);


import { mapGetters } from 'vuex';

// import Vue from 'vue';

// import axios from 'axios';

export default {
    name: 'MessageThread',
    props: {
        // title: String,
        // lastMsg: String,
    },
    components: {
        AddIcon,
    },
    methods: {
        ...mapGetters({
            isLoggedIn: 'isLoggedIn',
            getToken: 'getToken',
            getUser: 'getUser',
        }),
        newThread() {
            this.$emit('new-thread-click');
        },
        messageThreadClick(id) {
            console.log(id);

            let foundThread;

            this.threads.forEach(thread => {
                if (thread._id == id) {
                    foundThread = thread;
                }
            });

            this.$emit('show-thread', foundThread);
        }
    },
    data() {
        return {
            threads: [],
            threadTitles: [],
            user: null,
        }
    },
    async mounted() {
        if (this.isLoggedIn()) {
            //Get the threads that this users is a part of from the server.
            this.threads = await getThreads(this.$http);
            
            // console.log(this.threads);
            //Create the thread titles.

            // console.log(this.getUser());

            if (!this.threads) {
                //No threads exist.
                //TODO check this out and see if an err msg needs to be shown.
                return;
            }

            for (let i = 0; i < this.threads.length; i++) {
                //Create a new title for each thread.
                this.threads[i].title = "";

                //Get the last message that has been sent in the thread.
                if (this.threads[i].messages.length == 0) {
                    this.threads[i].lastMsg = null;
                } else {
                    this.threads[i].lastMsg = this.threads[i].messages[this.threads[i].messages.length - 1];
                }

                //Get an array of the users that are in the current thread.
                let users = this.threads[i].users;

                //Create a title string from those users names.
                for(let j = 0; j < users.length; j++) {
                    //Filter out all the users that are not the current user.
                    if (users[j].username !== this.getUser().username) {
                        this.threads[i].title += users[j].username;
                        this.threads[i].title += ", ";
                    }
                }

                //Get rid of the last ', ' in the title.
                this.threads[i].title = this.threads[i].title.substring(0, this.threads[i].title.length - 2);
            }
        }
    },
}
</script>

<style scoped>
    #message-thread-root {
        height: 100%;
        display: flex;
        justify-content: stretch;
        align-content: stretch;
        flex-direction: column;
        min-height: 0;
        /* overflow: hidden; */
    }

    #threads {
        flex: 12;
        overflow: auto;
        min-height: 0;
        flex-shrink: 0;
    }

    h4, p {
        margin: 0px;
    }

    .thread {
        background-color: #a1a1a1;
        border: 1px none #000;
        border-radius: 5px;
        margin: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        overflow-y: auto;
    }

    .thread-text {
        color: #2c3e50;
        margin: 8px;
    }

    .message-text {
        font-style: italic;
    }

    #new-thread-container {
        flex: 1;
        overflow: visible;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #new-thread {
        margin: 10px;
        width: 24px;
        border: 1px none #000;
        border-radius: 20px;
        background-color: #a1a1a1;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
        width: 40px;
    }

    span {
        overflow: hidden;
        height: 20px;
        width: 20px;
    }
</style>