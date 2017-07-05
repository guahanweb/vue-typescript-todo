<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo">
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <input class="toggle-all" type="checkbox" v-model="allDone">
      <ul class="todo-list">
        <todo-item v-for="todo in filteredTodos"
          class="todo"
          v-bind:key="todo.id"
          v-bind:item="todo"
          v-on:remove="removeTodo(todo)"
          :class="{completed: todo.completed, editing: todo == editedTodo }">
        </todo-item>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
      </span>
      <ul class="filters">
        <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
        <li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
        <li><a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import todoStorage from './stores/TodoList.ts';
import filters from './filters/todo.ts';

export default {
  name: 'app',
  data(): Todo.AppData {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  }

  created(): void {
    let onHashChange = () => {
      let visibility: string = window.location.hash.replace(/#\/?/, '');
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = '';
        this.visibility = 'all';
      }
    };

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  }

  watch: {
    todos: {
      handler: function (todos: Array<Todo.TodoItem>): void {
        todoStorage.save(todos);
      },
      deep: true
    }
  }

  methods: {
    addTodo: function (): void {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }

      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });

      this.newTodo = '';
    },

    removeTodo: function (todo: Todo.TodoItem): void {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    removeCompleted: function (): void {
      this.todos = filters.active(this.todos);
    }
  }

  computed: {
    filteredTodos: function (): Array<Todo.TodoItem> {
      return filters[this.visibility](this.todos);
    },
    remaining: function (): number {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function (): boolean {
        return this.remaining === 0;
      },

      set: function (value: boolean): void {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  }

  filters: {
    pluralize: function (n: number): string {
      return n === 1 ? 'item' : 'items';
    }
  }
}
</script>

<style lang="scss">
[v-cloak] { display: none; }
</style>
