let filters = {
    all: function (todos: Array<Todo.TodoItem>): Array<Todo.TodoItem> {
        return todos;
    },
    active: function (todos: Array<Todo.TodoItem>): Array<Todo.TodoItem> {
        return todos.filter(function (todo: Todo.TodoItem): boolean {
            return !todo.completed;
        });
    },
    completed: function (todos: Array<Todo.TodoItem>): Array<Todo.TodoItem> {
        return todos.filter(function (todo: Todo.TodoItem): boolean {
            return todo.completed;
        });
    }
}

export default filters;