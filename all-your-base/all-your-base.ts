function isInputValid(input: number[], fromBase: number) {
    return input.length > 0 && !(input.length > 1 && input[0] === 0) &&
        input.every((d) => 0 <= d && d < fromBase)
}

function isBaseValid(base: number) {
    return base > 1 && Math.floor(base) === base
}

export default class Converter {
    convert(input: number[], fromBase: number, toBase: number) {
        if (!isBaseValid(fromBase)) {
            throw new Error("Wrong input base")
        }

        if (!isBaseValid(toBase)) {
            throw new Error("Wrong output base")
        }

        if (!isInputValid(input, fromBase)) {
            throw new Error("Input has wrong format")
        }

        let numberValue = input.reduce((acc, x) => acc * fromBase + x, 0)

        const result = []

        do {
            result.push(numberValue % toBase)
            numberValue = Math.floor(numberValue / toBase)
        } while (numberValue > 0)

        result.reverse()

        return result
    }
}