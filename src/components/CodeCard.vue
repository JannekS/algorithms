<template>
  <div class="h-screen w-full flex flex-row items-center justify-center">
    <!-- Front & Back Side Container-->
    <div class="w-10/12 h-2/3 max-w-lg 2xl:h-1/2 group [perspective:900px]">
      <!-- Inner Container -->
      <div
        id="card-container"
        class="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
        :class="cardRotate"
      >
        <!-- front side -->
        <code-card-layout :cardHeading="algorithmData.name">
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
            <div v-show="displayCode" id="code-example" class="text-xs md:text-sm">
              <pre class="language-javascript">
                <code class="font-mono ">
                    {{ algorithmData.codeString }}
                </code>
              </pre>
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
        <code-card-layout :cardHeading="algorithmData.name" rotated="[transform:rotateY(180deg)]">
          <template #content>
            <div v-if="algorithmErr" class="mx-auto font-bold text-lg text-red-500">
              The visualisation for this algorithm can currently not be displayed.
            </div>
            <div class="flex flex-row justify-center items-end h-full py-6 space-x-2">
              <div
                v-for="(num, index) in sortArray"
                :key="index"
                class="w-4 rounded-sm"
                :class="paintBars(index)"
                :style="{ height: num * 6 + 'px' }"
              ></div>
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
  </div>
</template>

<script>
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
      sortArray: [6, 30, 21, 9, 5, 18, 35, 47, 19, 3, 41, 15, 29, 31, 7, 45, 30, 8, 14, 28],
      colorMarkers: {
        selectedElement: -1,
        minElement: -1,
        swapElement: -1,
      },
      sortedElements: [],
      resetToStart: true,
      algorithmErr: false,
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  updated() {
    Prism.highlightAll();
  },
  methods: {
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
        algorithms[this.algorithmData.name](this.sortArray, this.colorMarkers, this.sortedElements);
      } catch (err) {
        this.algorithmErr = true;
      }
    },
    paintBars(index) {
      if (index === this.colorMarkers.selectedElement) {
        return 'bg-cyan-400';
      } else if (this.sortedElements.includes(index)) {
        return 'bg-lime-500';
      } else if (index === this.colorMarkers.minElement) {
        return 'bg-orange-400';
      } else if (index === this.colorMarkers.swapElement) {
        return 'bg-orange-300';
      } else {
        return 'bg-slate-200';
      }
    },
    resetVisual() {
      this.randomizeArray();
      this.colorMarkers = {
        selectedElement: -1,
        minElement: -1,
        swapElement: -1,
      };
      this.sortedElements = [];
      this.resetToStart = true;
    },
    randomizeArray() {
      this.sortArray = [];
      for (let i = 0; i < 20; i++) {
        let randInt = Math.floor(Math.random() * 49 + 1);
        this.sortArray.push(randInt);
      }
    },
  },
};
</script>

<style scoped></style>
