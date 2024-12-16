type Element<T> = {
    element: T;
    priority: number;
}

export class PriorityQueue<T> {
    private queue: Element<T>[];

    constructor() {
        this.queue = [];
    }

    enqueue(element: T, priority: number) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift()!.element;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}