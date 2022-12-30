<script lang="ts" setup>
import { SelectStatus } from '@/store/index';
import type { SelectedChar } from '@/store/index';
import { computed } from 'vue';

const props = defineProps<{
    selection: SelectedChar,
    index: number,
}>();

const emit = defineEmits<{
    (event: 'set_selected', index: number): void;
}>();

const
    char = computed(() => props.selection.char),
    status = computed(() => props.selection.status),
    className = computed(() => {
        switch (status.value) {
            case SelectStatus.Unselected:
                return "char-select-unselected";
            case SelectStatus.Selected:
                return "char-select-selected";
            case SelectStatus.Wrong:
                return "char-select-wrong";
            case SelectStatus.Correct:
                return "char-select-correct";
        }
    });

</script>

<template lang="pug">
div.char-select(:class="className" @click="emit('set_selected', index)") {{ char }}
</template>

<style lang="scss">
.char-select {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    margin: 0.25em;
    padding: 0.25em;
    border: 1px solid gray;
    font-size: 1.5em;
    transition: background-color 500ms ease-in-out;

    &.char-select-selected {
        background-color: #eeeeee;
    }

    &.char-select-wrong {
        background-color: #ff9999;
    }

    &.char-select-correct {
        background-color: #99ff99;
    }
}
</style>