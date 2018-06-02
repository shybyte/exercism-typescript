export default class NucleotideCount {
    static nucleotideCounts(dna: string) {
        const counts: { [nucleotide: string]: number } = {A: 0, C: 0, G: 0, T: 0}
        for (const char of dna) {
            if (!(char in counts)) {
                throw new Error('Invalid nucleotide in strand')
            }
            counts[char] += 1
        }
        return counts
    }
}
