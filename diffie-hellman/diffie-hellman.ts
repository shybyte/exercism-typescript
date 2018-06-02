function isPrim(x: number) {
    const sqrtX = Math.sqrt(x)
    for (let i = 2; i < sqrtX; i++) {
        if (x % i === 0) {
            return false
        }
    }
    return true
}

function assertInRange(x: number, name: string) {
    if (x < 2) {
        throw new RangeError(`${name} is out of range`)
    }
}

function assertIsPrim(x: number, name: string) {
    if (!isPrim(x)) {
        throw new Error(`${name} should be prim`)
    }
}

export default class DiffieHellman {
    p: number
    g: number

    constructor(p: number, g: number) {
        assertInRange(p, 'p')
        assertInRange(g, 'g')
        assertIsPrim(p, 'p')
        assertIsPrim(g, 'g')
        this.p = p
        this.g = g
    }

    getPublicKeyFromPrivateKey(privateKey: number) {
        if (privateKey <= 1 || privateKey >= this.p) {
            throw new RangeError('privateKey is out of range')
        }
        return (this.g ** privateKey) % this.p
    }

    getSharedSecret(privateKey: number, publicKey: number) {
        return (publicKey ** privateKey) % this.p
    }
}
