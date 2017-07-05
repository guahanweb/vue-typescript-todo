<template>
    <li class="todo"
        :class="{completed: item.completed, editing: item == editedTodo }">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="item.completed">
            <label @dblclick="editTodo(item)">{{ item.title }}</label>
            <button class="destroy" @click="$emit('remove')"></button>
        </div>
        <input class="edit" type="text"
            v-model="item.title"
            v-todo-focus="item == editedTodo"
            @blur="doneEdit(item)"
            @keyup.enter="doneEdit(item)"
            @keyup.esc="cancelEdit(item)">
    </li>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        item: Object
    },

    directives: {
        'todo-focus': function (el: object, binding: object): void {
            if (binding.value) {
                el.focus();
            }
        }
    }
})

class TodoItem extends Vue {
    beforeEditCache = '';
    editedTodo = null

    editTodo: function (todo: Todo.TodoItem): void {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    }

    doneEdit: function (todo: Todo.TodoItem): void {
      if (!this.editedTodo) {
        return;
      }

      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.$emit('remove');
      }
    }

    cancelEdit: function (todo: Todo.TodoItem): void {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    }
}

export default TodoItem;
</script>

<style lang="scss">
[v-cloak] { display: none; }
</style>
