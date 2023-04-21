<template>
  <div class="w-96 mx-auto bg-green-400">
    <h2 class="p-8 text-center text-2xl font-bold text-slate-700">Hello Vue World!</h2>
  </div>
  <code-card />
</template>

<script>
import CodeCard from '@/components/CodeCard.vue';
export default {
  name: 'HomeView',
  components: {
    CodeCard,
  },
};
</script>

<style scoped></style>
