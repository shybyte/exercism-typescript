const pad2 = (n: number) => n.toString().padStart(2, '0')

export default class Clock {
    private readonly date: Date

    constructor(hour: number, minute = 0) {
        this.date = new Date(2000, 0, 0, hour, minute)
    }

    private getHour = () => this.date.getHours()
    private getMinutes = () => this.date.getMinutes()

    plus = (minutes: number) =>
        new Clock(this.getHour(), this.getMinutes() + minutes)

    minus = (minutes: number) =>
        new Clock(this.getHour(), this.getMinutes() - minutes)

    equals = (otherClock: Clock) =>
        this.getHour() === otherClock.getHour() &&
        this.getMinutes() === otherClock.getMinutes()

    toString = () => pad2(this.getHour()) + ':' + pad2(this.getMinutes())
}
