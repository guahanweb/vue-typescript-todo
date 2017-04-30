declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.vue" {
  import Vue from 'vue';
  export default typeof Vue;
}

declare module Todo {
  export interface TodoItem {
    uid: number,
    title: string,
    completed: boolean
  }

  export interface AppData {
    todos: Array<TodoItem>,
    newTodo: string,
    editedTodo: TodoItem,
    visibility: boolean
  }
}