<template>
  <div class="flex flex-col gap-2.5 mt-2.5 bg-white p-5 rounded">
    <div class="w-full h-1.5 bg-gray rounded">
      <div
        class="h-full bg-primary rounded transition-all duration-500 ease-in-out"
        :style="`width:${donePercentage}%`"
      />
    </div>

    <div
      v-for="(todoItem, key) in currentTicket.todoList"
      :key="key"
      class="todo-item flex max-w-full justify-between items-center text-base"
    >
      <p
        :class="{'text-primary line-through': todoItem.isDone}"
      >
        <button
          class="w-4 h-4 border-2 border-primary rounded-md mr-2.5 transition-colors duration-200 ease-in-out"
          :class="{'bg-primary': todoItem.isDone}"
          @click="todoItem.isDone = !todoItem.isDone; saveTodoItem()"
        /> 
        {{ todoItem.content }}
      </p>

      <Icon
        icon="heroicons-solid:x"
        class="icon-item cursor-pointer flex-shrink-0 hover:text-thirdary transition-colors duration-200 ease-in-out opacity-0"
        @click="removeTodoItem(todoItem.id)"
      /> 
    </div>

    <input
      v-if="todoItemInputVisible"
      ref="todoItemInput"
      v-model="todoItemContent"
      class="text-base w-full border-2 border-primary rounded-xl px-2.5 py-1"
      type="text"
      @blur="addNewTodoItem()"
      @keyup.enter.prevent="addNewTodoItem()"
      @keyup.esc="closeTodoItemInput()"
    >

    <button
      v-else
      class="w-fit text-gray hover:text-black transition-colors duration-200 ease-in-out"
      @click="showTodoItemInput()"
    >
      + Ajouter
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setTicketDocument } from '../utils/firestore';
import { Icon } from '@iconify/vue';
import statisticsMixin from "../mixins/statisticsMixin";

export default {
  name: 'TodoList',
  components: {
    Icon
  },
  mixins: [statisticsMixin],
  props: {
    short: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    todoItemInputVisible: false,
    todoItemContent: ""
  }),
  computed: {
    ...mapState(['tickets', 'connectedUser', 'selectedSpace']),
    currentTicket() {
      return this.tickets.find(ticket => ticket.slug === this.$route.params.slug);
    },
    currentTodoList() {
      return this.currentTicket.todoList;
    },
    donePercentage() {
      return this.currentTodoList.filter(item => item.isDone).length * 100 / this.currentTodoList.length;
    }
  },
  methods: {
    addNewTodoItem() {
      const trimedContent = this.todoItemContent.trim();
      if(trimedContent){
        this.currentTodoList.push({ id: Date.now(), content: trimedContent, isDone: false });
        this.saveTodoItem();
      }
      this.closeTodoItemInput();
    },
    closeTodoItemInput() {
      this.todoItemContent = "";
      this.todoItemInputVisible = false;
    },
    showTodoItemInput() {
      this.todoItemInputVisible = true;

      setTimeout(() => {
        this.$refs.todoItemInput.focus();
      }, 50);
    },
    saveTodoItem() {
      this.currentTicket.updateDate = new Date();
      this.currentTicket.todoListDonePercentage = this.donePercentage;
      setTicketDocument(this.connectedUser.uid, this.selectedSpace.id, this.currentTicket);
      this.updateStatistics(this.connectedUser.uid, this.selectedSpace.id, this.tickets);
    },
    removeTodoItem(id) {
      this.currentTicket.todoList = this.currentTodoList.filter(item => item.id !== id);
      this.saveTodoItem();
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-item:hover{
  p {
    color: theme('colors.primary');
  }
  .icon-item{
    opacity: 1;
  }
}
</style>
