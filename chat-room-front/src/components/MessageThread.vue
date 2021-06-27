<template>
    <div id="message-thread-root">
        <div id="threads">
            <div 
                class="thread"
                :key="thread.id" 
                v-for="thread in threads" 
                v-on:click="messageThreadClick(thread._id)">
                
                <h4 class="thread-text">{{thread.title}}</h4>
                <p v-if="thread.lastMsg != null" class="thread-text message-text">{{thread.lastMsg}}</p>
                <p v-if="thread.lastMsg == null" class="thread-text message-text">Send a Message!</p>
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

// import Vue from 'vue';

import axios from 'axios';

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

            this.$emit('show-messages', foundThread);
        }
    },
    data() {
        return {
            threads: [],
            threadTitles: [],
            user: null,
        }
    },
    created() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.get('http://localhost:3000/api/user/getthreads', {
                headers: {
                    Authorization: user.token,
                },
            }).then((res) => {
                this.threads = res.data.threads;

                this.user = JSON.parse(localStorage.getItem('user'));

                //Create the thread titles.

                for (let i = 0; i < this.threads.length; i++) {
                    this.threads[i].title = "";

                    if (this.threads[i].messages.length == 0) {
                        this.threads[i].lastMsg = null;
                    } else {
                        this.threads[i].lastMsg = this.threads[i].messages[this.threads[i].messages.length - 1];
                    }

                    let users = this.threads[i].users;

                    for(let j = 0; j < users.length; j++) {
                        if (users[j].username !== this.user.username) {
                            this.threads[i].title += users[j].username
                            this.threads[i].title += ", ";
                        }
                    }

                    this.threads[i].title = this.threads[i].title.substring(0, this.threads[i].title.length - 2);
                }


                // console.log(this.threads);
            }).catch (err => {
                console.error(err);
            });
        }
    }
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
        flex: 19;
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
    }

    #new-thread {
        margin: auto;
        margin-bottom: 10px;
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