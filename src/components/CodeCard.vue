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
              <p>Time Complexity: {{ algorithmData.complexity }}</p>
            </div>
            <!-- Code Example -->
            <div v-show="displayCode" id="code-example" class="text-xs md:text-sm">
              <!-- TODO: Change background color of code snippet. -->
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
import 'prismjs/themes/prism-okaidia.css';
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
        sortedElements: [],
      },
      reset: false,
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  methods: {
    toggleInfoCode() {
      this.displayCode = !this.displayCode;
    },
    async flipToBack() {
      this.cardRotate = '[transform:rotateY(180deg)]';
      await this.delay(1000);
      this.runCode();
    },
    flipToFront() {
      this.cardRotate = '';
      this.resetVisual();
    },
    async runCode() {
      this.reset = false;
      // this.bubbleSort(this.sortArray);
      this.selectionSort(this.sortArray);
    },
    paintBars(index) {
      if (index === this.colorMarkers.selectedElement) {
        return 'bg-cyan-400';
      } else if (this.colorMarkers.sortedElements.includes(index)) {
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
      this.reset = true;
      this.randomizeArray();
      this.selectedElement = 0;
      this.sortedElement = -1;
    },
    randomizeArray() {
      this.sortArray = [];
      for (let i = 0; i < 20; i++) {
        let randInt = Math.floor(Math.random() * 49 + 1);
        this.sortArray.push(randInt);
      }
    },
    async bubbleSort(arr) {
      for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
          if (this.reset) {
            return;
          }
          this.sortedElement = i;
          this.selectedElement = j;
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            this.selectedElement = j + 1;
          }
          await this.delay(300);
        }
      }
      this.sortedElement = 0;
    },
    async selectionSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        this.minElement = i;
        this.swapElement = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (this.reset) {
            return;
          }
          this.selectedElement = j;
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
            this.minElement = j;
          }
          await this.delay(300);
        }
        if (minIndex !== i) {
          let temp = arr[i];
          arr[i] = arr[minIndex];
          arr[minIndex] = temp;
        }
        this.minElement = i;
        this.swapElement = minIndex;
        await this.delay(500);
        this.sortedElement = i;
      }
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<style scoped></style>

<!-- :class="{
                  'bg-cyan-400': index === selectedElement,
                  'bg-lime-500': index >= sortedElement,
                  'bg-slate-200': index < sortedElement && index != selectedElement,
                }" -->
