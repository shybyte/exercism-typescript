const STOP = 'STOP'

const CODONS_PROTEIN_PAIRS: Array<[string [], string]> = [
    [['AUG'], 'Methionine'],
    [['UUU', 'UUC'], 'Phenylalanine'],
    [['UUA', 'UUG'], 'Leucine'],
    [['UCU', 'UCC', 'UCA', 'UCG'], 'Serine'],
    [['UAU', 'UAC'], 'Tyrosine'],
    [['UGU', 'UGC'], 'Cysteine'],
    [['UGG'], 'Tryptophan'],
    [['UAA', 'UAG', 'UGA'], STOP],
]

const PROTEIN_BY_CODON = CODONS_PROTEIN_PAIRS.reduce(
    (resultMap, [codons, protein]) => {
        codons.forEach((c) => {
            resultMap[c] = protein
        })
        return resultMap
    }, {} as { [codon: string]: string })

class ProteinTranslation {
    static proteins(rnaSequencesString = '') {
        const rnaSequences = rnaSequencesString.match(/.../g) || []
        const proteinSequences = rnaSequences.map((codon) => {
            const protein = PROTEIN_BY_CODON[codon]
            if (!protein) {
                throw new Error('Invalid codon')
            }
            return protein
        })

        const stopIndex = proteinSequences.indexOf(STOP)
        return stopIndex > -1 ? proteinSequences.slice(0, stopIndex) : proteinSequences
    }
}

export default ProteinTranslation
