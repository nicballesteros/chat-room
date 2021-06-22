<template>
    <div id="message-board-container">
        <div id="friends-board-container">
            <div id="friends-board">

            </div>
            <ul>
                <li>
                    Nic
                </li>
                <li>
                    Sofie
                </li>
                <li>
                    Jairo
                </li>
            </ul>
        </div>
        <div id="message-display-container">
            <div id="message-display">
                message
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'MessageBoard',
    props: {
        user: Object,
    }
}
</script>

<style scoped>
    #message-board-container {
        display: flex;
        border: 1px none #000;
        border-radius: 10px;
        background-color: #f0f0f0;
        /* margin: 12px; */
        flex: 1;
        align-items: stretch;
    }

    #friends-board-container {
        flex: 1;
    }

    #friends-board {
        margin: 8px;
    }

    #message-display-container {
        flex: 3;
    }

    #message-display {
        margin: 8px;
    }
</style>