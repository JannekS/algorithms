<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 h-screen w-full z-50 bg-slate-700 bg-opacity-50">
    <div class="flex flex-col justify-center items-center h-screen w-full">
      <Transition name="open-up">
        <!-- Front & Back Side Container-->
        <div
          v-show="isOpen"
          class="w-11/12 h-3/4 max-w-lg md:h-2/3 2xl:h-1/2 group [perspective:900px]"
        >
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
                <div class="flex flex-col items-center justify-end h-full">
                  <div v-if="algorithmErr" class="absloute font-bold text-lg text-red-500">
                    The visualisation for this algorithm can currently not be displayed.
                  </div>
                  <div
                    class="flex flex-row justify-center items-end h-96 py-6 space-x-1 md:space-x-2"
                  >
                    <div
                      v-for="(num, index) in sortArray"
                      :key="index"
                      class="w-3 rounded-sm md:w-4 min-w-min"
                      :class="paintBars(index)"
                      :style="{ height: num * 6 + 'px' }"
                    ></div>
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
      </Transition>
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
  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useModalStore, ['isOpen']),
  },
  mounted() {
    Prism.highlightAll();
  },
  updated() {
    Prism.highlightAll();
  },
  methods: {
    closeModal() {
      this.flipToFront();
      this.isOpen = false;
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
        algorithms[this.algorithmData.name](this.sortArray, this.colorMarkers, this.sortedElements);
      } catch (err) {
        this.algorithmErr = true;
      }
    },
    paintBars(index) {
      if (this.sortedElements.includes(index)) {
        return 'bg-lime-500';
      } else if (index === this.colorMarkers.selectedElement) {
        return 'bg-cyan-400';
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
      this.algorithmErr = false;
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

<style scoped>
.open-up-enter-active {
  animation: open-up 0.5s;
}
.open-up-leave-active {
  animation: open-up 0.5s reverse;
}
@keyframes open-up {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
