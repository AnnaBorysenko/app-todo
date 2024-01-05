/// <reference lib="dom" />

export function createElement(
    tag: string,
    className: string,
    text = "",
    attributes: { [key: string]: string } = {}
): HTMLElement {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text) {
        element.textContent = text;
    }
    for (const key of Object.keys(attributes)) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

export enum FilterOptions {
    All = "all",
    Completed = "completed",
    Active = "active",
}

export enum SortOptions {
    Default = "default",
    Content = "content",
    Date = "date",
}
