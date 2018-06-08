const WORD_BY_NUMBER: { [num: number]: string } = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety'
}

const CHUNK_WORDS = ['', 'thousand', 'million', 'billion']

const toReversedChunks =
    (n: number): number[] => n < 1000 ? [n] : [n % 1000].concat(toReversedChunks(Math.floor(n / 1000)))

const inEnglish = (n: number): string => {
    switch (true) {
        case n < 0 || n >= 1e12:
            throw new Error('Number must be between 0 and 999,999,999,999.')
        case !!WORD_BY_NUMBER[n]:
            return WORD_BY_NUMBER[n]
        case n < 20:
            return WORD_BY_NUMBER[n % 10] + 'teen'
        case n < 100:
            return WORD_BY_NUMBER[Math.floor(n / 10) * 10] + '-' + WORD_BY_NUMBER[n % 10]
        case n < 1000:
            return (
                WORD_BY_NUMBER[Math.floor(n / 100)] +
                ' hundred' +
                ((n % 100) > 0 ? ' ' + inEnglish(n % 100) : '')
            )
        default:
            return toReversedChunks(n).map(
                (chunkValue, i) => chunkValue ? inEnglish(chunkValue) + ' ' + CHUNK_WORDS[i] : ''
            ).reverse().join(' ').replace(/\s+/g, ' ').trim()
    }
}

export default class Say {
    inEnglish = inEnglish
}
