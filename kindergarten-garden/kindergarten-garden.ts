const PLANTS: { [char: string]: string } = {
    R: 'radishes',
    C: 'clover',
    G: 'grass',
    V: 'violets'
}

const DEFAULT_KIDS = [
    'Alice', 'Bob', 'Charlie', 'David',
    'Eve', 'Fred', 'Ginny', 'Harriet',
    'Ileana', 'Joseph', 'Kincaid', 'Larry'
]

export default class Garden {
    [name: string]: string[]

    constructor(gardenMap: string, kids = DEFAULT_KIDS
    ) {
        const sortedKids = [...kids].sort()
        const secondRowOffset = gardenMap.indexOf('\n') + 1
        sortedKids.forEach((kidName, i) => {
            const offsetStart = i * 2
            const offsets = [
                offsetStart, offsetStart + 1,
                offsetStart + secondRowOffset, offsetStart + 1 + secondRowOffset
            ]
            const plantNames = offsets.map((offset) => PLANTS[gardenMap[offset]])
            this[kidName.toLowerCase()] = plantNames
        })
    }
}
