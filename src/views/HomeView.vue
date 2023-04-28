<template>
  <algorithm-btn algorithm="bubbleSort" />
  <code-card />
</template>

<script>
import CodeCard from '@/components/CodeCard.vue';
import AlgorithmBtn from '../components/AlgorithmBtn.vue';
export default {
  name: 'HomeView',
  components: {
    CodeCard,
    AlgorithmBtn,
  },
};
</script>

<style scoped></style>
