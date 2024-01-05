import './input.css'
import {TodoApp} from "./TodoApp.ts";

window.addEventListener("load", () => {


    const todoList: HTMLElement | null = document.getElementById("todo-list") as HTMLElement;
    const todoForm: HTMLFormElement | null = document.getElementById("todo-form") as HTMLFormElement;
    const todoInput: HTMLInputElement | null = document.getElementById("todo-form-input")as HTMLInputElement;
    const todosFilter: HTMLSelectElement | null = document.getElementById("item-filter") as HTMLSelectElement;
    const todosSort: HTMLSelectElement | null = document.getElementById("item-sort") as HTMLSelectElement;

    if (todoList && todoForm && todoInput && todosFilter && todosSort) {
        const app = new TodoApp(todoList, todoForm, todoInput, todosFilter, todosSort);
        app.init();
    } else {
        console.error("Some of the elements were not found in the DOM.");
    }
});




