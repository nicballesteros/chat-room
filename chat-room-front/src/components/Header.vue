<template>
    <div id="header">
        <div class="header-row">
            <div class="header-col">
                <img src="../assets/logo.png" id="logo">
            </div>
            <div class="header-col">
                <div id="name-container">
                    <h1>Chat Room</h1>
                </div>
            </div>
            <div class="header-col">
                <router-link to="/login" id="login-btn">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
}
</script>

<style scoped>
    #header {
        border: 1px none #000;
        border-radius: 10px;
        background-color: #f0f0f0;
    }

    .header-col {
        width: 33%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }

    #logo {
        display: inline-block;
        margin: 12px;
        max-height: 100%;
    }

    #name-container {
        display: block;
        margin-top: 10px;
        margin-bottom: 20px;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: cneter;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    #login-btn {
        margin: 16px 18px 16px 12px;
        padding-top: 10px;
        padding-bottom: 10px;
        float: right;
        border-radius: 10px;
        text-align: left;
    }
</style>