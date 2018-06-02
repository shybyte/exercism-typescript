function markMultiple (array: number[], n: number) {
    for (let i = n; i <= array.length; i += n) {
        array[i] = n
    }
}

function primes(max: number) {
    const array = new Array(max + 1)
    const primes = []
    for (let i = 2; i <= max; i++) {
        if (!array[i]) {
            primes.push(i)
            markMultiple(array, i)
        }
    }
    return primes
}

export default {primes}