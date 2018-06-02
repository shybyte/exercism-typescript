export default class Prime {
    primes = [2]
    currentCandidate = 3

    nth(nthIndex: number) {
        if (!(Number.isInteger(nthIndex) && nthIndex > 0)) {
            throw new Error('Prime is not possible')
        }
        const i = nthIndex - 1
        while (!this.primes[i]) {
            if (this.primes.every((prime) => this.currentCandidate % prime !== 0)) {
                this.primes.push(this.currentCandidate)
            }
            this.currentCandidate += 1
        }
        return this.primes[i]
    }
}