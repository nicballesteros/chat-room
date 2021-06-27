<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div id="close-icon-container" @click="closeModal">
                <close-icon 
                    :size="20" 
                    id="close-icon"
                    title="Exit">
                </close-icon>
            </div>
            <div id="form-container">
                <form @submit="newThreadSubmit">
                    <p id="title">New Message</p>
                    <p id="note">(seperate users by ',')</p>
                    <input 
                        type="text"
                        placeholder="Username"
                        v-model="username"
                        id="username-field">
                    <input 
                        type="submit" 
                        value="Message"
                        id="submit-btn">
                </form>
                <p
                    v-if="errMsg != null"
                    id="err-msg">
                    {{errMsg}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close.vue'

import axios from 'axios';

export default {
    name: "NewMessageModal",
    components: {
        CloseIcon,
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        async newThreadSubmit(e) {
            //Prevent a redirect and the url containing the data.
            e.preventDefault();

            this.user = JSON.parse(localStorage.getItem('user'));

            //Validate the data.
            if (this.username == '') {
                this.errMsg = 'Please provide a valid username';
                return;
            }

            //Split the string into an array of usernames.
            let usernames = this.username.split(',');

            if (usernames.length > 1) {
                let ret = false;
                usernames.forEach(item => {
                    if (item === this.user.username) {
                        this.errMsg = "Cannot make a group message with yourself";
                        ret = true;
                        return;
                    }
                });

                if (ret) {
                    return;
                }
            }

            //Check to see if the user exists before exiting the modal.
            if (! await this.checkUser(usernames)) {
                return;
            }

            //Tell the parent that the user wants to make a new thread with this user.
            this.$emit('new-thread', usernames);

            //Close the modal.
            this.closeModal();
        },
        async checkUser(usernames) {
            //Get the user from local storage.
            let user = JSON.parse(localStorage.getItem('user'));
            
            //This really should never happen but is here just in case.
            if (user == null) {
                this.errMsg = "Login before making messages";
                return false; //Should prolly throw an err.
            }

            try {
                //Call the server to see if the user exists.
                let res = await axios.post('http://localhost:3000/api/user/exists', {
                    usernames: usernames,
                }, {
                    headers: {
                        Authorization: user.token,
                    },
                });

                //If the user does not exist, print an err msg.
                if (!res.data.exists) {
                    this.errMsg = "The user inputted does not exist";
                    return false;
                }

                return true;

            } catch (err) {
                console.error(err);
            }
        },
        //TODO provide REGEX support so that they can search for users.
    },
    data() {
        return {
            errMsg: null,
            username: '',
            user: null,
        }
    }
}
</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        justify-items: center;
        align-content: space-between;
        align-items: center;
    }

    .modal {
        width: 20%;
        max-width: 400px;
        margin: auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        position: relative;
    }

    #close-icon {
        position: absolute;
        right: 0;
        top: 0;
        margin: 10px;
    }

    input {
        margin: auto;
        width: 90%;
    }

    #username-field {
        margin-bottom: 12px;
    }

    #err-msg {
        margin: 12px auto 0px auto;
        color: #b22222;
        font-size: 12px;
    }

    #note {
        margin: 8px;
        font-size: 12px;
    }

    #title {
        margin: 8px;
        margin-bottom: 0px;
    }
</style>