<template>
    <div id="message-content-root">
        <div id="content">
            <div id="history" class="items">
                <div v-if="this.title == null && this.threadExists">
                    <h4>Choose a thread to start chatting!</h4>
                </div>
                <div v-if="!this.threadExists">
                    <h4>Press the plus icon to make a new thread!</h4>
                </div>
                <div 
                    id="thread-title"
                    v-if="this.title != null">
                        <h4>{{this.title}}</h4>
                </div>
                <div id="messages" v-if="this.messages != null">
                    <div 
                    id="no-messages-msg"
                    v-if="this.messages.length === 0">
                        <p>No messages yet. Be the first to send one!</p>
                    </div>
                    <div 
                        class="message" 
                        v-for="(message, index) in messages" 
                        :key="index">
                    
                    </div>
                </div>
            </div>
            <div 
            id="input" 
            class="items"
            v-if="this.title != null">
                <div id="textarea-container">
                    <textarea 
                        name="newmsg" 
                        id="newmsg" 
                        v-model="text"
                        placeholder="Message"
                        @keyup.enter="handleSend"
                        @keydown.enter.exact.prevent>
                        
                    </textarea>
                </div>
                <button @click="handleSend">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageContent',
    props: {
        messages: Array,
        title: String,
        threadId: String,
        threadExists: Boolean,
    },
    data() {
        return {
            text: "",
        }
    },
    methods: {
        handleSend(e) {
            e.preventDefault();

            if (this.text === "") {
                return;
            }

            let text = this.text;
            this.text = "";
            console.log(text);
        }
    },
    created() {
        console.log(this.messages);


    }

}
</script>

<style scoped>
    #message-content-root {
        height: 100%;
    }

    #content {
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: stretch;
    }

    #history {
        /* position: absolute; */
        /* top: 0; */
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-bottom: 4px;
    }

    #input {
        /* height: 25; */
        flex: 0 0 max-content;
        display: flex;
        justify-content: space-between;
        /* width: 100%; */
        align-items: center;
        box-sizing: border-box;
    }

    .items {
        margin: 12px;
        margin-top: 0px;
    }

    #textarea-container {
        flex: 1;
        /* margin: 4px; */
        margin-right: 14px;
        box-sizing: border-box;
    }

    textarea {
        resize: none;
        border: 1px solid #2c3e50;
        display: block;
        height: 34px;
        border-radius: 5px;
        padding: 10px;
        width: 100%;
        font-size: 14px;
        flex: 1 1 auto;
        box-sizing: border-box;
        -webkit-box-sizing:border-box;
        outline: none;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    textarea::placeholder {
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    button {
        width: max-content;
        height: max-content;
        flex: 0 0 auto;
        box-sizing: border-box;
        font-size: 14px;
        padding: 3px;
    }
    
    h4 {
        margin: 8px;
    }

    #messages {
        border: 2px solid #2c3e50;
        height: 100%;
    }

    #no-messages-msg {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    #no-messages-msg p {
        margin: 0px;
        flex: 1
    }
</style>