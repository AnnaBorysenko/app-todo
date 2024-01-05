

export class Todo {
    public content: string;
    public completed: boolean;
    public id: number;

    constructor(content = "", id: number = Date.now(), completed = false) {
        this.content = content;
        this.completed = completed;
        this.id = id;
    }

    toggleCompleted() {
        this.completed = !this.completed
    }

    getTodoCreated(): string {
        const date = new Date(this.id);
        return date.toLocaleString();

    }
}








