const toSegments = (text: string, size: number): string[] => text ?
    text.match(new RegExp(`.{1,${size}}`, 'g')) as string[]
    : []

const encrypt = (textSegments: string[], length: number) =>
    Array.from({length}, (_, i) =>
        textSegments.map((segment) => segment[i]).join('')
    ).join('')

export default class Crypto {
    private _ciphertext: string
    private _normalizedText: string
    private _size: number
    private _plaintextSegments: string[]

    constructor(text: string) {
        // Works only for latin/english letters, but who cares.
        this._normalizedText = text.toLowerCase().replace(/[^\da-z]/g, '')
        this._size = Math.ceil(Math.sqrt(this._normalizedText.length))
        this._plaintextSegments = toSegments(this._normalizedText, this._size)
        this._ciphertext = encrypt(this._plaintextSegments, this._size)
    }

    normalizePlaintext = () => this._normalizedText
    size = () => this._size
    plaintextSegments = () => this._plaintextSegments
    ciphertext = () => this._ciphertext
}
