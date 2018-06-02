type Array2D = number[][]

export default class Matrix {
    rows: Array2D
    columns: Array2D

    constructor(matrixString: string) {
        this.rows = matrixString
            .split('\n')
            .map((rowString) =>
                rowString
                    .split(/\s+/)
                    .map((s) => parseFloat(s))
            )

        this.columns = this.rows[0].map((_, colIndex) =>
            this.rows.map((row) => row[colIndex])
        )
    }
}
