import {TodoList} from "./TodoList.ts";
import { UI } from "./UI.js";
import {FilterOptions, SortOptions} from "../utils/utils.ts";

export class TodoApp {
    private filter: string;
    private sort: string;
    private todoList: TodoList;

    constructor(
        private todoListElement: HTMLElement,
        private todoFormElement: HTMLFormElement,
        private todoInputElement: HTMLInputElement,
        private todosFilterElement: HTMLSelectElement,
        private todosSortElement: HTMLSelectElement
    ) {
        this.todoListElement = todoListElement;
        this.todoFormElement = todoFormElement;
        this.todoInputElement = todoInputElement;
        this.todosFilterElement = todosFilterElement;
        this.todosSortElement = todosSortElement;
        this.filter = FilterOptions.All;
        this.sort = SortOptions.Default;
        this.todoList = new TodoList();
    }

    init() {
        UI.setOptions(this.todosFilterElement, FilterOptions);
        UI.setOptions(this.todosSortElement, SortOptions);
        this.todoFormElement.addEventListener('submit', this.handleSubmit.bind(this));
        this.todoListElement.addEventListener('click', this.handleListClick.bind(this));
        this.todosFilterElement.addEventListener('change', this.handleFilterChange.bind(this));
        this.todosSortElement.addEventListener('change', this.handleSortChange.bind(this));
        this.render();
    }

   private handleListClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const todoId: number = Number(target.parentElement?.dataset.id)
        if (target.classList.contains('remove')) {
            if (todoId) {
                this.todoList.removeTodo(todoId);
            }
        } else if (target.classList.contains('change')) {
            if (todoId) {
                this.todoList.toggleTodoCompleted(todoId);
            }
        }
        this.render();
    }

    private handleFilterChange(event: Event) {
        this.filter = (event.target as HTMLSelectElement).value;
        this.render();
    }

    private handleSortChange(event: Event) {
        this.sort = (event.target as HTMLSelectElement).value;
        this.render();
    }


    private handleSubmit(event: Event) {
        event.preventDefault();
        const todoContent = this.todoInputElement.value.trim();
        if (!todoContent) return;
        this.todoList.addTodo(todoContent);
        this.todoInputElement.value = '';
        this.render();
    }

    private render() {
        this.todoListElement.innerHTML = '';
        const todosArr = this.todoList.getTodos(this.filter, this.sort);
        UI.fillTodoList(this.todoListElement, todosArr);
    }
}
