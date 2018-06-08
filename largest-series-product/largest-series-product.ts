const product = (array: number[]) => array.reduce((ac, x) => ac * x, 1)

export default class Serie {
    private digits: number[]

    constructor(digitString: string) {
        this.digits = [...digitString].map(Number)
        if (this.digits.includes(NaN)) {
            throw new Error('Invalid input.')
        }
    }

    slice(sliceLength: number): number[][] {
        if (sliceLength > this.digits.length) {
            throw new Error('Slice size is too big.')
        }
        return this.digits
            .slice(0, this.digits.length - sliceLength + 1)
            .map((_, i) => this.digits.slice(i, i + sliceLength))
    }

    largestProduct(sliceLength: number) {
        if (sliceLength < 0) {
            throw new Error('Invalid input.')
        }

        if (this.digits.length === 0) {
            if (sliceLength > 0) {
                throw new Error('Slice size is too big.')
            }
            return 1
        }

        const slices = this.slice(sliceLength)
        return Math.max(...slices.map(product))
    }
}