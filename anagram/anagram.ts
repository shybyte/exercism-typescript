const sortedLetters = ([...letters]: string) => letters.sort().join('')

export default class Anagram {
    private readonly wordLowerCase: string
    private readonly sortedWordLetters: string

    constructor(word: string) {
        this.wordLowerCase = word.toLowerCase()
        this.sortedWordLetters = sortedLetters(this.wordLowerCase)
    }

    matches = (...words: string[]) =>
        words.filter((w) =>
            this.wordLowerCase !== w.toLowerCase()
            && this.sortedWordLetters === sortedLetters(w.toLowerCase())
        )

}