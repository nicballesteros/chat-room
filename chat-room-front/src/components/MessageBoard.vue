<template>
    <div id="message-board-container">
        <div id="friends-board-container" class="boards">
            <div id="friends-board">
                <MessageThread
                v-on:new-thread-click="handleNewThread" 
                v-on:show-thread="handleShowThread"
                />
            </div>
        </div>
        <div id="message-display-container" class="boards">
            <MessageContent 
            :messages="this.messages"
            :title="this.title" 
            :threadExists="true"
            :currentUsername="getUser().username"
            v-on:message-event="handleMessageEvent"
            />
        </div>
    </div>
</template>

<script>
//TODO add the functionality of the thread chooser. Maybe just get all messages and threads and sockets
//here so that it can be passed down into the child components.
//TODO implement the threadExists on the message content part.
import MessageThread from './MessageThread.vue';
import MessageContent from './MessageContent.vue';
import { mapActions, mapGetters } from 'vuex';

import io from 'socket.io-client';
 
export default {
    name: 'MessageBoard',
    props: {
        user: Object,
        isNewMessageModelVisible: Boolean,
    },
    components: {
        MessageThread,
        MessageContent,
    },
    methods: {
        ...mapGetters({
            hasSocket: 'hasSocket',
            getToken: 'getToken',
            getUser: 'getUser',
        }),
        ...mapActions({
            makeSocket: 'makeSocket',
        }),
        handleNewThread() {
            this.$emit('new-thread-click');
        },
        handleShowThread(thread) {
            // console.log(thread);

            this.threadId = thread._id;

            this.messages = thread.messages;
            // console.log(this.messages);
            this.title = thread.title;

            this.socket.emit('thread', {
                threadId: this.threadId,
                auth: this.getToken(),
            });
        },
        async handleMessageEvent(message) {   
            //Send the message to the server.
            //TODO stop sending just the username of the current user. Eventually the server will get the username from the jwt. But that requires a custom jwt strategy.           
            this.socket.emit('message', {
                message: message,
                threadId: this.threadId,
                auth: this.getToken(),
            });

            this.messages.push({
                message: message,
                user: this.getUser().username,
                timestamp: Date.now(),
            });
        },
        async initSocket() {
            try {
                //Allow the app to call the server at these parameters.
                let protocol = 'http://';
                let hostname = location.hostname;
                let port = 3000;

                //Create a new socket.
                this.socket = io(`${protocol}${hostname}:${port}/api/messagesocket`, {
                    path: '/api/socket.io'
                });

                this.socket.on('connect', () => {
                    //Send to the server the current thread id.
                    this.socket.emit('thread', {
                        threadId: this.threadId,
                        auth: this.getToken(),
                    });

                    this.socket.on('message', (message) => {
                        // console.log(message);
                        this.messages.push(message);
                    });
                });

                //Socket.io Error Handling.
                this.socket.on('connect-error', (err) => {
                    console.error(err);
                });

                // socket.connect()
            } catch (err) {
                console.error(err);
            }
        }
    },
    data() {
        return {
            messages: null,
            title: null,
            threadId: null,
            socket: null,
        }
    },
    created() {
        this.initSocket();
        // try {
        //     let protocol = 'http://';
        //     let hostname = location.hostname;
        //     let port = 3000;
        //     this.socket = io(`${protocol}${hostname}:${port}/api/messagesocket`, {
        //         path: '/api/socket.io'
        //     });

        //     // console.log(`${protocol}${hostname}:${port}/api/messagesocket`);

        //     // console.log('connecting to socket');

        //     console.log(this.socket);

        //     this.socket.on('connect', () => {
        //         console.log('connected');

        //         this.socket.emit('thread', this.threadId);
        //     });

        //     this.socket.on('connect-error', (err) => {
        //         console.error(err);
        //     });

        //     // socket.connect()
        // } catch (err) {
        //     console.error(err);
        // }
    }
}
</script>

<style scoped>
    #message-board-container {
        display: flex;
        border: 1px none #000;
        border-radius: 10px;
        background: #f0f0f0;
        flex: 1;
        align-items: stretch;
    }

    .boards {
        margin: 16px;
        border: 1px none #000;
        border-radius: 20px;
        background: #f7f7f7;    
    }

    #friends-board-container {
        flex: 1;
        
    }

    #friends-board {
        margin: 0px;
        height: 100%;
    }

    #message-display-container {
        flex: 3;
    }

    #message-display {
        margin: 8px;
    }
</style>