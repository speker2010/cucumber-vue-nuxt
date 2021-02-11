<template>
    <div>
        <div class="message" v-if="message">{{message}}</div>
        <button @click="clickHandler">say</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: ''
        }
    },
    methods: {
        clickHandler() {
            this.message = 'Hello'
        }
    }
}
</script>