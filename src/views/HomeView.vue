<template>
  <div class="h-screen bg-gradient-to-bl from-teal-100 to-sky-400">
    <ul class="flex flex-col justify-center items-center pt-10">
      <li v-for="algorithmObj in algorithmData" :key="algorithmObj.id">
        <algorithm-btn :algorithm="algorithmObj.name" @btnClicked="openCodeCard" />
      </li>
    </ul>
  </div>
  <modal-layer :modalOpen="modalDisplayed">
    <code-card :algorithmData="algorithmData[selectedAlgorithm]" />
  </modal-layer>
</template>

<script>
import useModalStore from '@/Stores/modal.js';
import { mapStores, mapWritableState } from 'pinia';
import CodeCard from '@/components/CodeCard.vue';
import AlgorithmBtn from '../components/AlgorithmBtn.vue';
import ModalLayer from '@/components/ModalLayer.vue';
export default {
  name: 'HomeView',
  components: {
    CodeCard,
    AlgorithmBtn,
    ModalLayer,
  },
  mounted: async function () {
    const url = '/algorithmData.json';
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
  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useModalStore, ['modalDisplayed']),
  },
  methods: {
    openCodeCard(algorithm) {
      this.selectedAlgorithm = algorithm;
      this.modalDisplayed = true;
    },
  },
};
</script>

<style scoped></style>
