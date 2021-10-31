<template>
  <h2 class="font-bold text-title mb-8">
    <span class="bg-primary text-white px-2.5 py-1 rounded font-bold text-base">
      {{ $route.params.slug }} 
    </span>
    {{ currentTicket.title }}
  </h2>

  <QuillEditor
    v-model:content="ticketContent"
    content-type="html"
    theme="bubble"
    toolbar="essential"
    class="text-base"
    @textChange="updateTicketContent(ticketContent)"
  />
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: 'TicketList',
  components: {},
  data: () => ({
    ticketContent: ''
  }),
  computed: {
    ...mapState(['tickets']),
    currentTicket() {
      return this.tickets.find(ticket => ticket.slug === this.$route.params.slug);
    }
  },
  methods: {
    updateTicketContent: _.debounce((ticketContent) =>{
      console.log(ticketContent);
    }, 1000)
  }
};
</script>

<style lang="scss">
div .ql-container{
  height:auto;
  font-size: inherit;
  font-family: 'Roboto', 'sans-serif';

.ql-editor{
    padding: 1.25rem;
    min-height: 300px;
    border-radius: 1.25rem;
    background-color: white;
    border: 2px solid white;

    &:focus{
      border-color: theme('colors.primary');
    }

    h1{
      font-size: 2rem;
      line-height: 2.5rem;
      font-weight: 700;
    }

    h2{
      font-weight: 700;
    }
  }
}
</style>
