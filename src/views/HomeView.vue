<template>
  <ul class="flex flex-col justify-center items-center mt-10">
    <li v-for="algorithmObj in algorithmData" :key="algorithmObj.id">
      <algorithm-btn :algorithm="algorithmObj.name" @btnClicked="openCodeCard" />
    </li>
  </ul>

  <code-card :algorithmData="algorithmData[selectedAlgorithm]" />
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
  mounted: async function () {
    const url = 'http://localhost:5174/algorithmData.json'; // TODO: Use path.
    try {
      const response = await fetch(url);
      const result = await response.json();

      result.forEach((element) => {
        this.algorithmData[element.name] = element;
      });
    } catch (error) {
      console.log('ERROR:');
      console.log(error);
      // TODO: Handle errors properly.
    }
  },
  data() {
    return {
      algorithmData: {},
      selectedAlgorithm: {
        type: String,
        default: '',
      },
    };
  },
  methods: {
    openCodeCard(algorithm) {
      this.selectedAlgorithm = algorithm;
    },
  },
};
</script>

<style scoped></style>
