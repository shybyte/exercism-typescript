type ShiftArray = number[]

const charCodeOf = (char: string) => char.charCodeAt(0)
const toChar = (charCode: number) => String.fromCharCode(charCode)

const aCODE = charCodeOf('a')
const ALPHABET_LENGTH = charCodeOf('z') + 1 - aCODE

const randomKey = () =>
    Array.from({length: 100}, () =>
        toChar(Math.random() * (ALPHABET_LENGTH) + aCODE)
    ).join('')

const wrapInAlphabetRange = (charCode: number) =>
    (charCode - aCODE + 10 * ALPHABET_LENGTH) % ALPHABET_LENGTH + aCODE

const applyShiftArray = (shiftArray: ShiftArray, [...chars]) =>
    chars
        .map(charCodeOf)
        .map((charCode, i) =>
            wrapInAlphabetRange(charCode + shiftArray[i % shiftArray.length])
        )
        .map(toChar)
        .join('')

const inverseShiftArray = (shiftArray: ShiftArray) => shiftArray.map((shift) => ALPHABET_LENGTH - shift)

class SimpleCipher {
    public readonly key: string
    private readonly shiftArray: ShiftArray

    constructor(key: string = randomKey()) {
        if (!/[a-z]$/.test(key)) {
            throw new Error('Bad key')
        }
        this.key = key
        this.shiftArray = [...this.key].map((c) => charCodeOf(c) - aCODE)
    }

    encode(s: string) {
        return applyShiftArray(this.shiftArray, s)
    }

    decode(s: string) {
        return applyShiftArray(inverseShiftArray(this.shiftArray), s)

    }
}

export default SimpleCipher
