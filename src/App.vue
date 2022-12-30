<script lang="ts" setup>
import Input from '@/components/Input.vue';
import RandomNumber from './components/RandomNumber.vue';
import Word from './components/Word.vue';
</script>

<template lang="pug">
div#root
    Word
    Input
    RandomNumber(:min="1" :max="44")
</template>

<style lang="scss">
@import "./assets/normalize.scss";
#root {
    padding: 2em 6em 0 1em;
}

.random-number {
    position: fixed;
    right: 0.5em;
    top: 0.5em;
}
</style>