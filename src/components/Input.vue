<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { SelectStatus, usePuzzleStore, CharStatus } from '@/store/index';
import { computed, ref } from 'vue';
import CharSelect from './CharSelect.vue';

const { currentPuzzle } = storeToRefs(usePuzzleStore());
const { next_puzzle } = usePuzzleStore();
const
    set_selected = (index: number) => {
        let sel = currentPuzzle.value.selections[index];
        if (sel.status == SelectStatus.Unselected)
            sel.status = SelectStatus.Selected;
        else if (sel.status == SelectStatus.Selected)
            sel.status = SelectStatus.Unselected;
    },
    submit_chars = () => {
        let selectedChars = currentPuzzle.value.selections.filter((value) => {
            return value.status == SelectStatus.Selected;
        });
        selectedChars.forEach((ch) => {
            if (currentPuzzle.value.submit(ch.char))
                ch.status = SelectStatus.Correct;
            else
                ch.status = SelectStatus.Wrong;
        });
        if (currentPuzzle.value.content.filter((value) => value.status === CharStatus.Hidden).length == 0)
            setTimeout(next_puzzle, 1500);
    };

</script>

<template lang="pug">
div.input
    div.chars-select
        CharSelect(
            v-for="(selection, i) in currentPuzzle.selections"
            :key="`${currentPuzzle.id}-${i}`"
            :selection="selection"
            :index="i"
            @set_selected="set_selected"
        )
    div.submit
        button(type="button" @click="submit_chars") 提交
</template>

<style lang="scss">
.input {
    text-align: center;
    width: 50em;
    margin: 0 auto;
}
</style>