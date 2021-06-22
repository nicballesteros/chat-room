<template>
    <div id="message-thread-root">
        <h3>{{this.title}}</h3>
        <p>{{this.lastMsg}}</p>
    </div>
</template>

<script>
export default {
    name: 'MessageThread',
    props: {
        title: String,
        lastMsg: String,
    },
}
</script>

<style scoped>

</style>