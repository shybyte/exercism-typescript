export default class BinarySearchTree {
    readonly data: number
    left: BinarySearchTree
    right: BinarySearchTree

    constructor(data: number) {
        this.data = data
    }

    insert(data: number) {
        if (data <= this.data) {
            if (this.left) {
                this.left.insert(data)
            } else {
                this.left = new BinarySearchTree(data)
            }
        } else {
            if (this.right) {
                this.right.insert(data)
            } else {
                this.right = new BinarySearchTree(data)
            }
        }
    }

    each(f: (value: number) => void) {
        if (this.left) {
            this.left.each(f)
        }
        f(this.data)
        if (this.right) {
            this.right.each(f)
        }
    }
}