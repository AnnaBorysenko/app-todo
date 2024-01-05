import {Todo} from "./Todo.ts"
import {FilterOptions, SortOptions} from "../utils/utils.ts";

export class TodoList {
    private todos: Todo[];

    constructor() {
        const storedTodosString = localStorage.getItem('todos');

        if (storedTodosString === null) {
            this.todos = [];
        } else {
            try {
                const storedTodos = JSON.parse(storedTodosString);
                this.todos = Array.isArray(storedTodos)
                    ? storedTodos.map(({ completed, content, id }: Todo) => new Todo(content, id, completed))
                    : [];
            } catch (error) {
                console.error("Error parsing storedTodos:", error);
                this.todos = [];
            }
        }
    }





    addTodo(content : any): void {
        this.todos.unshift(new Todo(content));
        this.save();
    }
    removeTodo(todoId : any): void {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        console.log("here")
        this.save();
    }

    toggleTodoCompleted(todoId :any): void {
        const todo: Todo | undefined = this.todos.find(todo => todo.id === todoId);
        if(!todo) return;
        todo.toggleCompleted();
        this.save();
    }

    filterTodos(option: string, todos: Todo[]): Todo[] {
        if (option === FilterOptions.Completed) {
            return todos.filter(todo => todo.completed);
        } else if (option === FilterOptions.Active) {
            return todos.filter(todo => !todo.completed);
        }
        return todos;
    }

    sortTodos(sort: string, todos: Todo[]): Todo[] {
        if (sort === SortOptions.Date) {
            return todos.sort((a: any , b: any) => a.idTodo - b.idTodo);
        }
        if (sort === SortOptions.Content) {
            return todos.sort((a, b) => {
                if (a.content.length < b.content.length) return -1;
                if (a.content.length > b.content.length) return 1;
                return 0;
            });
        }
        return todos;
    }

    getTodos(filter: string, sort: string): Todo[] {
        const filteredTodos = this.filterTodos(filter, this.todos);
        return this.sortTodos(sort, filteredTodos);
    }

    save(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

}

















