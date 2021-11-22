<template>
  <div class="flex flex-col gap-2.5 mt-2.5 bg-white p-5 rounded">
    <div class="w-full h-1.5 bg-gray rounded">
      <div class="w-1/3 h-full bg-primary rounded" />
    </div>

    <p><button class="w-4 h-4 border-2 border-primary rounded-md mr-2.5" />Finir la maquette</p>

    <p class="text-primary line-through">
      <button class="w-4 h-4 border-2 border-primary rounded-md mr-2.5 bg-primary" />Terminer et activer la connexion avec Github
    </p>

    <p><button class="w-4 h-4 border-2 border-primary rounded-md mr-2.5" />Un super truc cool à faire</p>

    <button class="w-fit text-gray hover:text-black transition-colors duration-200">
      + Ajouter
    </button>
  </div>
</template>

<script>
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
  }),
};
</script>

<style scoped></style>
