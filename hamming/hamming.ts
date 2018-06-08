export default class Hamming {
    compute(strand1: string, strand2: string) {
        if (strand1.length !== strand2.length) {
            throw new Error('DNA strands must be of equal length.')
        }
        return [...strand1]
            .filter((base1, i) => base1 !== strand2[i])
            .length
    }
}