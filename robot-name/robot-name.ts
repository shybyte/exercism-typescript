const LETTERS_RANGE = 26
const DIGITS_RANGE = 10
const CHAR_CODE_A = 'A'.charCodeAt(0)

const randomLetter = () => String.fromCharCode(Math.floor(Math.random() * LETTERS_RANGE) + CHAR_CODE_A)
const randomDigit = () => Math.floor(Math.random() * DIGITS_RANGE)
const randomName = () => randomLetter() + randomLetter() + randomDigit() + randomDigit() + randomDigit()

const usedNames = new Set()
const unUsedRandomName = () => {
    // Don't risk to need really LONG to find an unused name.
    if (usedNames.size >= (LETTERS_RANGE ** 2 * DIGITS_RANGE ** 3) * 0.9) {
        throw new Error('Out of new robot names!')
    }

    let name
    do {
        name = randomName()
    } while (usedNames.has(name))
    usedNames.add(name)
    return name
}

export default class Robot {
    name: string

    constructor() {
        this.resetName()
    }

    resetName() {
        this.name = unUsedRandomName()
    }
}