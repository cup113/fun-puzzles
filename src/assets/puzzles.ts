const enum PuzzleCategory {
    Poetry,
    Surprise,
}

const enum Tag {
    NewYear = "新年",
    Chinese = "中国",
    Rabbit = "兔",
    Advertisement = "???",
}

export interface Puzzle {
    content: string,
    excludes: string,
    category: PuzzleCategory,
    tags: Tag[],
    tipChars?: number,
    tips: string[],
}

export const puzzles: Puzzle[] = [
    {
        content: "千门万户曈曈日，总把新桃换旧符。",
        excludes: "，。",
        category: PuzzleCategory.Poetry,
        tags: [Tag.Chinese, Tag.NewYear],
        tipChars: 2,
        tips: [
            "(宋)王安石",
            "《元日》",
            "爆竹声中一岁除，春风送暖入屠苏。",
        ],
    },
    {
        content: "长大我要当太空人，爷爷奶奶可高兴了，给我爱吃的喜之郎果冻。",
        excludes: "，，。",
        category: PuzzleCategory.Surprise,
        tags: [Tag.Advertisement],
        tipChars: 2,
        tips: ["广告词", "喜之郎"],
    },
    {
        content: "海日生残夜，江春入旧年。",
        excludes: "，。",
        category: PuzzleCategory.Poetry,
        tags: [Tag.Chinese, Tag.NewYear],
        tipChars: 2,
        tips: [
            "王湾《次北固山下》",
            "潮平两岸阔，风正一帆悬。",
        ],
    },
    {
        content: "雄兔脚扑朔，雌兔眼迷离；双兔傍地走，安能辨我是雄雌？",
        excludes: "，；？",
        category: PuzzleCategory.Poetry,
        tags: [Tag.Chinese, Tag.Rabbit],
        tipChars: 2,
        tips: [
            "《木兰诗》",
        ],
    },
];
