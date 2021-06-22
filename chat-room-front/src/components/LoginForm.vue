<template>
    <div id="login-form-container">
        <form @submit="submitLoginForm" id="login-form">
            <h3>Login</h3>
            <input 
                type="text" 
                name="username" 
                id="username"
                placeholder="Username"
                v-model="username"
            >
            <input 
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                v-model="password"
            >
            <input 
                type="submit"
                value="Login"
                id="submitBtn"
            >
            <p v-if="this.localErrorMsg != null" id="errormsg">
                {{ localErrorMsg }}
            </p>

            <p v-if="this.errorMsg != null" id="postErrMsg">
                {{ this.errorMsg }}
            </p>

        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    props: {
        errorMsg: String,
    },
    methods: {
        submitLoginForm(e) {
            e.preventDefault();

            if (!this.username || !this.password) {
                this.localErrorMsg = "Please enter a valid Username and Password!";
                return;
            }

            if (this.localErrorMsg) {
                this.localErrorMsg = null;
            }

            //Construct the user authentication object.
            const formData = {
                username: this.username,
                password: this.password,
            }

            //Emit to Login Page (parent) that the user wants to post data.
            this.$emit('login-event', formData);
        },
    },
    data() {
        return {
            username: null,
            password: null,
            showErrorMsg: false,
            localErrorMsg: null,
        }
    },
    // created() {
    //     //To protect prop manipulation.
    //     this.localErrorMsg = this.errorMsg;
    // },
    // updated() {
    //     //To protect prop manipulation.
    //     this.localErrorMsg = this.errorMsg;
    // }
}
</script>

<style scoped>
    #login-form-container {
        width: 25%;
        border: 1px none #000;
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 12px;
        margin: auto;
        margin-top: 24px;
    }

    #login-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    input {
        flex: 1;
        margin-bottom: 8px;
    }

    #submitBtn {
        margin: auto;
        margin-top: 8px;
        width: 33%;
    }

    #errormsg {
        font-size: 12px;
    }

    #postErrMsg {
        color: #b22222;
    }
</style>