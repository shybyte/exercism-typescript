const ALLERGIES = [
    'eggs',
    'peanuts',
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats'
]

const isBitTrue = (bitSet: number, bitPos: number) =>
    !!(bitSet & Math.pow(2, bitPos))

export default class Allergies {
    allergiesBitSet: number

    constructor(allergiesBitSet: number) {
        this.allergiesBitSet = allergiesBitSet
    }

    allergicTo = (name: string) =>
        isBitTrue(this.allergiesBitSet, ALLERGIES.indexOf(name))

    list = () =>
        ALLERGIES.filter((_, i) => isBitTrue(this.allergiesBitSet, i))
}