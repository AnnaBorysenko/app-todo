import {classNames} from "../utils/className.ts";
import {createElement} from "../utils/utils.ts";
import {Todo} from "./Todo.ts";

export class UI {
    static getToggleBtn(completed: boolean): HTMLButtonElement {
        const text = completed ? 'completed' : 'not completed';
        const toggleBtnClasses = [
            classNames.BUTTON,
            classNames.TOGGLE_BTN

        ];
        if (completed) {
            toggleBtnClasses.push(classNames.PRIMARY_BUTTON);
        } else {
            toggleBtnClasses.push(classNames.DANGER_BUTTON);
        }
        return createElement(
            'button',
            toggleBtnClasses.join(" "),
            text,
        ) as HTMLButtonElement;

    }

    static getRemoveBtn(): HTMLButtonElement {
        const removeBtnClasses = [
            classNames.BUTTON,
            classNames.DANGER_BUTTON,
            classNames.REMOVE_BTN
        ];
        return createElement(
            'button',
            removeBtnClasses.join(" "),
            'remove',
        ) as HTMLButtonElement;
    }

    static getTodoElement(todo: Todo): HTMLLIElement {
        const removeTodoBtn = this.getRemoveBtn();
        const toggleTodoBtn = this.getToggleBtn(todo.completed);


        const todoElementClasses = [
            classNames.COLUMN_FLEX,
            classNames.TITLE
        ];
        const createdSpan = createElement(
            'span',
            'mb-3 font-normal text-sm text-gray-700 dark:text-gray-400',
            todo.getTodoCreated(),
        );
        const todoElement = createElement(
            'li',
            todoElementClasses.join(" "),
            todo.content,
            {"data-id": todo.id.toString()}
        ) as HTMLLIElement;


        todoElement.append(createdSpan, removeTodoBtn, toggleTodoBtn);
        return todoElement;
    }

    static fillTodoList(todoListElement: HTMLElement, todosArr: Todo[]): void {
        todosArr.forEach(todo => {
            const todoElement = this.getTodoElement(todo);
            todoListElement.appendChild(todoElement);
        });
    }

    static setOptions(element: HTMLSelectElement, options: Record<string, string>): void {
        const optionsArr = Object.keys(options);
        optionsArr.forEach(option => {
            const optionElement = createElement(
                "option",
                '',
                option,
                {"value": options[option]},
            ) as HTMLOptionElement;
            element.appendChild(optionElement);
        });
    }
}
