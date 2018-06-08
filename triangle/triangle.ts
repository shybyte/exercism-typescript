export default class Triangle {
    sortedSides: number[]

    constructor(...sides: number[]) {
        this.sortedSides = sides.sort((a, b) => a - b)
    }

    kind() {
        const [a, b, c] = this.sortedSides
        switch (true) {
            case a <= 0 || (a + b <= c):
                throw new Error('Illegal triangle!')
            case a === c:
                return 'equilateral'
            case a === b || b === c:
                return 'isosceles'
            default:
                return 'scalene'
        }
    }
}
