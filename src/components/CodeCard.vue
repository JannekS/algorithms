<template>
  <!-- Front & Back Side Container-->
  <div class="w-11/12 h-3/4 max-w-lg md:h-2/3 2xl:h-1/2 group [perspective:900px]">
    <!-- Inner Container -->
    <div
      id="card-container"
      class="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
      :class="cardRotate"
    >
      <!-- front side -->
      <code-card-layout :cardHeading="algorithmData.name" @closeBtnClicked="closeModal">
        <template #content>
          <!-- Basic Info -->
          <div v-show="!displayCode" id="code-info" :class="displayInfo">
            <h2 class="text-lg font-bold font-mono">Basic Info</h2>
            <p>
              {{ algorithmData.description }}
            </p>
            <br />
            <p class="font-bold font-mono">Time Complexity: {{ algorithmData.complexity }}</p>
          </div>
          <!-- Code Example -->
          <div v-show="displayCode" id="code-example" class="text-xs md:text-sm mt-[-20px]">
            <pre
              class="language-javascript"
            ><code class="font-mono ">{{ algorithmData.codeString }}</code></pre>
          </div>
        </template>

        <template #footer>
          <!-- Left Button -->
          <div>
            <base-button
              v-show="!displayCode"
              value="Show Code"
              imgUrl="/icons/code-solid.svg"
              @btnClicked="toggleInfoCode"
            ></base-button>
            <base-button
              v-show="displayCode"
              value="Show Info"
              imgUrl="/icons/info-solid.svg"
              @btnClicked="toggleInfoCode"
            ></base-button>
          </div>
          <!-- Right Button -->
          <div>
            <base-button
              value="Run Code"
              imgUrl="/icons/circle-play-regular.svg"
              @btnClicked="flipToBack"
            ></base-button>
          </div>
        </template>
      </code-card-layout>

      <!-- Back Side -->
      <code-card-layout
        :cardHeading="algorithmData.name"
        rotated="[transform:rotateY(180deg)]"
        @closeBtnClicked="closeModal"
      >
        <template #content>
          <!-- Visualisation -->
          <div class="flex flex-col items-center justify-end h-full">
            <div v-if="algorithmErr" class="absloute font-bold text-lg text-red-500">
              The visualisation for this algorithm can currently not be displayed.
            </div>
            <div class="flex flex-row justify-center items-end h-96 py-6">
              <div
                v-for="(num, index) in sortArray"
                :key="index"
                class="w-4 ml-1 rounded-sm md:ml-2"
                :class="[paintBars(index), { 'ml-4': dividedElements.includes(index) }]"
                :style="{ height: num * 6 + 'px' }"
              ></div>
              <div v-if="colorMarkers.insertionElement">
                <div
                  class="w-3 ml-3 rounded-sm md:w-4 bg-cyan-400"
                  :style="{ height: colorMarkers.insertionElement * 6 + 'px' }"
                ></div>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <!-- Back Right Button -->
          <div>
            <base-button
              value="Go Back"
              imgUrl="/icons/backward-fast-solid.svg"
              @btnClicked="flipToFront"
            ></base-button>
          </div>
          <!-- Back Left Buttons -->
          <div class="flex flex-row">
            <base-button
              value="Replay"
              imgUrl="/icons/repeat-solid.svg"
              @btnClicked="runCode"
            ></base-button>
            <base-button
              value="Shuffle Array"
              imgUrl="/icons/shuffle-solid.svg"
              @btnClicked="resetVisual"
            ></base-button>
          </div>
        </template>
      </code-card-layout>
    </div>
  </div>
</template>

<script>
import useModalStore from '@/Stores/modal.js';
import { mapStores, mapWritableState } from 'pinia';
import Prism from 'prismjs';
import '@/assets/prism-custom.css';
import algorithms from '@/algorithms.js';
import BaseButton from '@/components/BaseButton.vue';
import CodeCardLayout from '@/components/CodeCardLayout.vue';

export default {
  name: 'CodeCard',
  components: { BaseButton, CodeCardLayout },
  props: {
    algorithmData: {
      type: Object,
      default() {
        return {
          name: 'Something went wrong...',
          description:
            'You managed to open the card without selecting an algorithm. Please close the card and try to select an algorithm.',
        };
      },
    },
  },
  data() {
    return {
      displayInfo: '',
      displayCode: false,
      cardRotate: '',
      sortArray: [6, 30, 21, 9, 5, 18, 35, 47, 19, 3, 41, 15, 29, 31, 7, 45],
      colorMarkers: {
        selectedElement: -1,
        minElement: -1,
        swapElement: -1,
        insertionElement: 0,
      },
      sortedElements: [],
      dividedElements: [],
      resetToStart: true,
      algorithmErr: false,
    };
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useModalStore, ['modalDisplayed']),
  },
  mounted() {
    Prism.highlightAll();
  },
  updated() {
    Prism.highlightAll();
  },
  methods: {
    async closeModal() {
      if (this.cardRotate != '') {
        this.flipToFront();
        await algorithms.delay(300);
      }
      this.modalDisplayed = false;
    },
    toggleInfoCode() {
      this.displayCode = !this.displayCode;
    },
    async flipToBack() {
      this.cardRotate = '[transform:rotateY(180deg)]';
      await algorithms.delay(1000);
      this.runCode();
    },
    flipToFront() {
      this.cardRotate = '';
      this.resetVisual();
    },
    async runCode() {
      if (!this.resetToStart) {
        this.resetVisual();
      }
      this.resetToStart = false;
      try {
        if (this.algorithmData.name === 'mergeSort') {
          console.log('MergeSort should be visualised.');
          algorithms[this.algorithmData.name](
            this.sortArray,
            this.colorMarkers,
            this.sortedElements,
            this.dividedElements
          );
        } else {
          algorithms[this.algorithmData.name](
            this.sortArray,
            this.colorMarkers,
            this.sortedElements
          );
        }
      } catch (err) {
        this.algorithmErr = true;
      }
    },
    paintBars(index) {
      if (index === this.colorMarkers.selectedElement) {
        return 'bg-cyan-400';
      } else if (index === this.colorMarkers.minElement) {
        return 'bg-orange-400';
      } else if (index === this.colorMarkers.swapElement) {
        return 'bg-orange-300';
      } else if (this.sortedElements.includes(index)) {
        return 'bg-lime-500';
      } else {
        return 'bg-slate-200';
      }
    },
    separateBars(index) {
      if (this.dividedElements.includes(index)) {
        return 'mr-2';
      } else {
        return 'mr-0';
      }
    },
    resetVisual() {
      this.randomizeArray();
      this.colorMarkers = {
        selectedElement: -1,
        minElement: -1,
        swapElement: -1,
        insertionElement: null,
      };
      this.sortedElements = [];
      this.resetToStart = true;
      this.algorithmErr = false;
    },
    randomizeArray() {
      this.sortArray = [];
      for (let i = 0; i < 16; i++) {
        let randInt = Math.floor(Math.random() * 49 + 1);
        this.sortArray.push(randInt);
      }
    },
  },
};
</script>

<style scoped></style>
