<template>
    <div id="message-board-container">
        <div id="friends-board-container" class="boards">
            <div id="friends-board">
                <MessageThread
                    v-on:new-thread-click="handleNewThread" 
                    v-on:show-messages="handleMessages"
                />
            </div>
        </div>
        <div id="message-display-container" class="boards">
            <MessageContent :messages="this.messages" :title="this.title" />
        </div>
    </div>
</template>

<script>
import MessageThread from './MessageThread.vue';
import MessageContent from './MessageContent.vue';

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
        handleNewThread() {
            this.$emit('new-thread-click');
        },
        handleMessages(data) {
            // console.log(data);
            this.messages = data.messages;
            this.title = data.title;

            console.log(this.messages);
        }
    },
    data() {
        return {
            messages: null,
            title: null,
        }
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