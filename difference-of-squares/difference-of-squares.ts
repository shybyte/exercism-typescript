export default class Squares {
    sumOfSquares: number
    squareOfSums: number
    difference: number

    constructor(n: number) {
        const squareOfSums = Math.pow(n * (n + 1) / 2, 2)

        let sumOfSquares = 0
        for (let i = 1; i <= n; i++) {
            sumOfSquares += i * i
        }

        this.difference = squareOfSums - sumOfSquares
        this.sumOfSquares = sumOfSquares
        this.squareOfSums = squareOfSums
    }
}