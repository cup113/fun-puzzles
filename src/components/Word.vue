<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePuzzleStore } from '@/store/index';
import Character from './Character.vue';
const { currentPuzzle } = storeToRefs(usePuzzleStore());
</script>

<template lang="pug">
div.words
    div.chars
        Character(
            v-for="(ch, i) in currentPuzzle.content"
            :key="`${currentPuzzle.id}-${i}`"
            :char="ch"
        )
    div.tips
        div(v-for="tip in currentPuzzle.shownTips") {{ tip }}
        button(type="button" @click="currentPuzzle.show_one_tip") 获取提示
</template>

<style lang="scss">
.words {
    text-align: center;
    user-select: none;
}
</style>