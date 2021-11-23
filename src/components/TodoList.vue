<template>
  <div class="flex flex-col gap-2.5 mt-2.5 bg-white p-5 rounded">
    <div class="w-full h-1.5 bg-gray rounded">
      <div class="w-1/3 h-full bg-primary rounded" />
    </div>

    <p
      v-for="(todoItem, key) in currentTicket.todoList"
      :key="key"
      :class="{'text-primary line-through': todoItem.isDone}"
    >
      <button
        class="w-4 h-4 border-2 border-primary rounded-md mr-2.5 transition-colors duration-200 ease-in-out"
        :class="{'bg-primary': todoItem.isDone}"
        @click="todoItem.isDone = !todoItem.isDone; saveTodoItem()"
      /> {{ todoItem.content }}
    </p>

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

export default {
  name: 'TodoList',
  props: {
    short: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    todoItemInputVisible: false,
    newTodoItem: {
      content: '',
      isDone: false
    },
    todoItemContent: ""
  }),
  computed: {
    ...mapState(['tickets', 'connectedUser', 'selectedSpace']),
    currentTicket() {
      return this.tickets.find(ticket => ticket.slug === this.$route.params.slug);
    },
  },
  methods: {
    addNewTodoItem() {
      const trimedContent = this.todoItemContent.trim();
      if(trimedContent){
        this.currentTicket.todoList.push({ content: trimedContent, isDone: false });
        this.saveTodoItem();
      }
      this.closeTodoItemInput();
    },
    closeTodoItemInput() {
      this.todoItemContent = "";
      this.todoItemInputVisible = false;
    },
    showTodoItemInput(){
      this.todoItemInputVisible = true;

      setTimeout(() => {
        this.$refs.todoItemInput.focus();
      }, 50);
    },
    saveTodoItem(){
      this.currentTicket.updateDate = new Date();
      setTicketDocument(this.connectedUser.uid, this.selectedSpace.id, this.currentTicket);
    }
  }
};
</script>

<style scoped></style>
