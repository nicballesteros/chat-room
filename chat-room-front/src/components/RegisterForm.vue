<template>
    <div id="register-form-container">
        <form @submit="submitRegisterForm" id="register-form">
            <h3>Register</h3>
            <input 
                type="text" 
                name="username" 
                id="username"
                placeholder="New Username"
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
                type="password"
                name="password2"
                id="password2"
                placeholder="Retype Password"
                v-model="retypePassword"
            >
            <input 
                type="submit"
                value="Login"
                id="submitBtn"
            >
            <!-- <p v-if="this.localErrorMsg != null" id="errormsg">
                {{ localErrorMsg }}
            </p>

            <p v-if="this.errorMsg != null" id="postErrMsg">
                {{ this.errorMsg }}
            </p> -->

        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    methods: {
        submitRegisterForm(e) {
            e.preventDefault();

            if (this.password == null || this.retypePassword == null || this.username == null) {
                //TODO error msg

                console.error('Cannot have null values');

                return;
            }

            if (this.password !== this.retypePassword) {
                //TODO make error msg

                console.error('Passwords do not match');

                return;
            }

            const newUser = {
                username: this.username,
                password: this.password,
            }

            this.$emit('register-user', newUser);
        }
    },
    data() {
        return {
            username: null,
            password: null,
            retypePassword: null,
        }
    }
}
</script>

<style scoped>
    #register-form-container {
        width: 25%;
        border: 1px none #000;
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 12px;
        margin: auto;
        margin-top: 24px;
    }

    #register-form {
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