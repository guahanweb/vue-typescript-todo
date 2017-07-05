import Vue from 'vue'
import App from './App.vue'

import TodoItem from './components/TodoItem.vue'
Vue.component('todo-item', TodoItem);

new Vue({
  el: '#app',
  components: {},
  render: h => h(App)
})
