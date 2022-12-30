<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps<{
    min: number,
    max: number,
}>();

const
    num = ref(NaN),
    display = computed(() => isNaN(num.value) ? "--" : num.value.toString()),
    change_number = () => {
        num.value = Math.floor(Math.random() * (props.max - props.min + 1)) + props.min;
    };

</script>

<template lang="pug">
div.random-number
    span {{ display }}
    button(type="button" @click="change_number") Go
</template>

<style lang="scss">
.random-number {
    display: block;
    background-color: #dddddd;
    padding: 4px 1em;
    text-align: center;

    span {
        font-size: 2em;
        display: block;
    }

    button {
        padding: 0 0.5em;
        font-size: 1.5em;
        display: block;
    }
}
</style>