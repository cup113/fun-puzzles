<script lang="ts" setup>
import { computed } from 'vue';
import { CharStatus } from '@/store/index';
import type { DisplayChar } from '@/store/index';
const props = defineProps<{
    char: DisplayChar
}>();

const
    ch = computed(() => props.char.char),
    status = computed(() => props.char.status),
    shown = computed(() => status.value != CharStatus.Hidden),
    display = computed(() => shown.value ? ch.value : "?"),
    className = computed(() => {
        switch (status.value) {
            case CharStatus.Hidden:
                return "char-hidden";
            case CharStatus.Excluded:
                return "char-excluded";
            case CharStatus.ShownFirst:
                return "char-shown-first";
            case CharStatus.Guessed:
                return "char-guessed";
        }
    });
</script>

<template lang="pug">
div.char(:class="className") {{ display }}
</template>

<style lang="scss">
.char {
    display: inline-block;
    font-weight: bold;
    font-size: 2em;
    width: calc(1.5em + 4px);
    line-height: 1.5em;
    height: calc(1.5em + 4px);
    text-align: center;
    border: 2px solid black;
    transition: background-color 1s ease-in-out;

    &.char-hidden {
        background-color: #eeeeee;
    }

    &.char-shown-first {
        background-color: #eeeeff;
    }

    &.char-guessed {
        background-color: #ddffdd;
    }
}
</style>