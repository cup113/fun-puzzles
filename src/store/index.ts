import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import shuffleList from 'shuffle-list';

import { puzzles } from '@/assets/puzzles';
import type { Puzzle } from '@/assets/puzzles';

export const enum CharStatus {
    Hidden = 0,
    Excluded = 1,
    ShownFirst = 2,
    Guessed = 3,
}

export const enum SelectStatus {
    Unselected = 0,
    Selected = 1,
    Wrong = 2,
    Correct = 3,
}

export interface DisplayChar {
    char: string,
    status: CharStatus,
}

export interface SelectedChar {
    char: string,
    status: SelectStatus,
}

export class GamePuzzle {
    static MAX_SELECTIONS = 50;

    private _puzzle: Puzzle;
    private _tipsIndex: number;
    id: string;
    content: DisplayChar[];
    charMap: Map<string, number[]>;
    excludes: Set<string>;
    shownTips: string[];
    selections: SelectedChar[];

    constructor(puzzle: Puzzle, index: number) {
        this._puzzle = puzzle;
        this._tipsIndex = 0;
        this.id = index.toString();
        this.content = puzzle.content.split("").map((char) => {
            return { char, status: CharStatus.Hidden };
        });
        this.charMap = new Map();
        this.excludes = new Set(puzzle.excludes.split(""));
        this.shownTips = [];
        this.selections = [];
        let chars = puzzle.content.split("");
        for (let i in chars) {
            if (this.excludes.has(chars[i])) {
                this.content[i].status = CharStatus.Excluded;
                continue;
            }
            if (!this.charMap.has(chars[i]))
                this.charMap.set(chars[i], []);
            this.charMap.get(chars[i])!.push(parseInt(i));
        }
    }

    /** Initialize selectableChars & charStatus (shown first) */
    init_chars(charSet: Set<string>): void {
        let shownFirstChars = this._puzzle.tipChars ?? Math.ceil(this.content.length * 0.15);
        let shownChoices: number[] = []; // indexes: in charMap
        let selectChoices: string[] = []; // indexes: not in excludes and charMap
        this.content.forEach((value, index) => {
            if (this.charMap.has(value.char))
                shownChoices.push(index);
        });
        let shownFirst = shuffleList(shownChoices).slice(0, shownFirstChars);
        shownFirst.forEach((value) => this.content[value].status = CharStatus.ShownFirst);
        charSet.forEach((value) => {
            if (this.excludes.has(value))
                return;
            if (this.charMap.has(value)) {
                this.selections.push({ char: value, status: SelectStatus.Unselected });
            } else {
                selectChoices.push(value);
            }
        });
        for (let char of selectChoices) {
            this.selections.push({ char, status: SelectStatus.Unselected });
        }
        this.selections = shuffleList([...this.selections]);

    }

    show_one_tip(): boolean {
        if (this.shownTips.length == 0) {
            this.shownTips.push(this._puzzle.tags.join("，"));
            return true;
        }
        if (this._tipsIndex >= this._puzzle.tips.length)
            return false;
        this.shownTips.push(this._puzzle.tips[this._tipsIndex]);
        this._tipsIndex++;
        return true;
    }

    submit(ch: string): boolean {
        let match = this.charMap.get(ch);
        if (match === undefined)
            return false;
        match.forEach((value) => { this.content[value].status = CharStatus.Guessed });
        return true;
    }
};

export const usePuzzleStore = defineStore("puzzles", () => {
    const gamePuzzles = puzzles.map((p, i) => new GamePuzzle(p, i));
    const charSet: Set<string> = new Set();
    gamePuzzles.forEach(gamePuzzle => {
        gamePuzzle.charMap.forEach((_, key) => charSet.add(key));
    });
    gamePuzzles.forEach(gamePuzzle => gamePuzzle.init_chars(charSet));
    let puzzlesIndex = 0;
    const currentPuzzle = ref(gamePuzzles[0]);
    function next_puzzle() {
        ++puzzlesIndex;
        if (puzzlesIndex >= gamePuzzles.length)
            return;
        currentPuzzle.value = gamePuzzles[puzzlesIndex];
    }
    console.log(gamePuzzles, charSet);
    return {
        next_puzzle,
        currentPuzzle,
    }
});
