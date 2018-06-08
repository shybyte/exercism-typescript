const MAX_PINS = 10
const NORMAL_FRAMES_COUNT = 10

interface Frame {
    needsMoreFillBalls(fillBalls: number): boolean

    firstThrowPoints(): number
}

class FrameOpen implements Frame {
    pins1: number
    pins2: number

    constructor(pins1: number, pins2: number) {
        this.pins1 = pins1
        this.pins2 = pins2
    }

    // eslint-disable-next-line no-unused-vars
    needsMoreFillBalls(_fillBalls: number) {
        return false
    }

    firstThrowPoints() {
        return this.pins1
    }
}

class FrameSpare implements Frame {
    private pins: number

    constructor(pins: number) {
        this.pins = pins
    }

    needsMoreFillBalls(fillBalls: number) {
        return fillBalls < 1
    }

    firstThrowPoints() {
        return this.pins
    }
}

class FrameStrike implements Frame {
    needsMoreFillBalls(fillBalls: number) {
        return fillBalls < 2
    }

    firstThrowPoints() {
        return 10
    }
}

function windows<T>(array: T[], windowSize: number) {
    return array
        .slice(0, array.length - windowSize + 1)
        .map((_, i) => array.slice(i, i + windowSize))
}

function sum(array: number[]) {
    return array.reduce((s, value) => s + value, 0)
}

function scoreBowlingGame(rolls: number[]) {
    const frames: Frame[] = []
    let incompleteFrame: number | undefined
    let fillBallsCount = 0

    function needsMoreFillBalls() {
        if (frames.length < NORMAL_FRAMES_COUNT) {
            return false
        }
        return frames[NORMAL_FRAMES_COUNT - 1].needsMoreFillBalls(fillBallsCount)
    }

    function roll(pins: number) {
        if (pins < 0 || pins > MAX_PINS) {
            throw new Error('Pins must have a value from 0 to 10')
        } else if (pins + (incompleteFrame || 0) > MAX_PINS) {
            throw new Error('Pin count exceeds pins on the lane')
        }

        if (frames.length >= NORMAL_FRAMES_COUNT) {
            if (needsMoreFillBalls()) {
                fillBallsCount += 1
            } else {
                throw new Error('Should not be able to roll after game is over')
            }
        }

        if (typeof incompleteFrame === 'number') {
            frames.push(incompleteFrame + pins === MAX_PINS ?
                new FrameSpare(incompleteFrame) : new FrameOpen(incompleteFrame, pins))
            incompleteFrame = undefined
        } else if (pins === MAX_PINS) {
            frames.push(new FrameStrike())
        } else {
            incompleteFrame = pins
        }
    }

    function scoreFrameWindow([first, second, third]: [Frame, Frame, Frame]) {
        if (first instanceof FrameStrike) {
            return 10 + (
                second instanceof FrameOpen ?
                    second.pins1 + second.pins2 : 10 + third.firstThrowPoints()
            )
        } else if (first instanceof FrameSpare) {
            return 10 + second.firstThrowPoints()
        } else if (first instanceof FrameOpen) {
            return first.pins1 + first.pins2
        } else {
            throw new Error('Unknown frame ' + first)
        }
    }

    rolls.forEach(roll)

    if (frames.length < NORMAL_FRAMES_COUNT || needsMoreFillBalls()) {
        throw new Error('Score cannot be taken until the end of the game')
    }

    frames.push(new FrameOpen(incompleteFrame || 0, 0))
    frames.push(new FrameOpen(0, 0)) // make sure the later windows(3) gets happy

    return sum(windows(frames, 3).slice(0, NORMAL_FRAMES_COUNT).map(scoreFrameWindow))
}

export default class {
    rolls: number[]

    constructor(rolls: number[]) {
        this.rolls = rolls
    }

    score() {
        return scoreBowlingGame(this.rolls)
    }
}
