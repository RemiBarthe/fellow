<template>
  <div class="bg-white p-5 rounded flex flex-col justify-between">
    <p class="font-bold pb-2">
      Tickets {{ status }}
    </p>
    <p class="text-gray text-center pb-2">
      Vous n’avez aucun ticket {{ status }}
    </p>
    <Button
      class="bg-black text-white mx-auto"
      @click="createNewTicket()"
    >
      Créer un ticket
    </Button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Button from '../components/Button.vue';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  name: 'TicketCardList',
  components: {
    Button
  },
  props: {
    status: {
      type: String,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    ...mapState(['connectedUser', 'selectedSpace', 'spaces'])
  },
  methods: {
    ...mapActions(['setSelectedSpace']),
    async createNewTicket() {
      await this.updateTicketsNumber();

      const formattedTitle = this.selectedSpace.title.replace(/\s/g, "").toLowerCase();
      const slug = `${formattedTitle}-${this.selectedSpace.ticketsNumber}`;
      await this.saveNewTicket(slug);

      this.$router.push(`/tickets/${slug}`);
    },
    updateTicketsNumber() {
      const spaceRef = doc(
        db,
        'users',
        this.connectedUser.uid,
        'spaces',
        this.selectedSpace.id
      );
      setDoc(spaceRef, { ticketsNumber: increment(1) }, { merge: true });

      const updatedSelectedSpace = this.spaces.find(space => space.id === this.selectedSpace.id);
      this.setSelectedSpace(updatedSelectedSpace);
    },
    saveNewTicket(slug) {
      const ticketsRef = doc(
        db,
        'users',
        this.connectedUser.uid,
        'spaces',
        this.selectedSpace.id,
        'tickets',
        slug
      );
      return setDoc(ticketsRef, { slug, title: `Titre temporaire ${slug}` }, { merge: true });
    }
  }
};
</script>

<style lang="scss" scoped></style>
