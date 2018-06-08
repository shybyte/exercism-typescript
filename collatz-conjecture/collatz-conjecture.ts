export default class CollatzConjecture {
    static steps(n: number ) {
        if (n <= 0) {
            throw new Error('Only positive numbers are allowed')
        }

        let x = n
        let count = 0

        while (x !== 1) {
            if (x % 2 === 0) {
                x = Math.floor(x / 2)
            } else {
                x = x * 3 + 1
            }
            count += 1
        }

        return count
    }
}
