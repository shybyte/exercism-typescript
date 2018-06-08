export default class Series {
    digits: number[]

    constructor(digitString: string) {
        this.digits = [...digitString].map(Number)
    }

    slices = (sliceLength: number) => {
        if (sliceLength > this.digits.length) {
            throw new Error('Slice size is too big.')
        }
        return this.digits
            .slice(0, this.digits.length - sliceLength + 1)
            .map((_, i) => this.digits.slice(i, i + sliceLength))
    }
}
