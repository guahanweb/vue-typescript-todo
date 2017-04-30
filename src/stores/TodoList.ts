const STORAGE_KEY: string = 'todos-vuejs-2.0';

let todoStorage: any = {
    uid: null,

    fetch: function (): Array<object> {
        let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(function (todo: any, index: number) {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },

    save: function (todos: Array<object>): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

export default todoStorage;