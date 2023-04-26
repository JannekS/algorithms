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
        <code-card-layout :cardHeading="cardHeading">
          <template #content>
            <!-- Basic Info -->
            <div v-show="!displayCode" id="code-info" :class="displayInfo">
              <h2 class="text-lg font-bold font-mono">{{ infoTitle }}</h2>
              <p>
                {{ infoText }}
              </p>
            </div>
            <!-- Code Example -->
            <div v-show="displayCode" id="code-example" class="text-xs md:text-sm">
              <!-- TODO: Change background color of code snippet. -->
              <pre class="language-javascript">
                    <code class="font-mono ">
                        {{ codeExample }}
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
                @btnClicked="runCode"
              ></base-button>
            </div>
          </template>
        </code-card-layout>

        <!-- Back Side -->
        <code-card-layout :cardHeading="cardHeading" rotated="[transform:rotateY(180deg)]">
          <template #content>
            <div class="flex flex-row justify-center items-end h-full py-6 space-x-2">
              <div
                v-for="(num, index) in sortArray"
                :key="index"
                class="w-4 rounded-sm"
                :class="{
                  'bg-cyan-400': index === selectedElement,
                  'bg-lime-500': index >= sortedElement,
                  'bg-slate-200': index < sortedElement && index != selectedElement,
                }"
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
              <base-button value="Replay" imgUrl="/icons/repeat-solid.svg"></base-button>
              <base-button value="Shuffle Array" imgUrl="/icons/shuffle-solid.svg"></base-button>
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
  data() {
    return {
      displayInfo: '',
      displayCode: false,
      cardRotate: '',
      cardHeading: 'bubbleSort',
      infoTitle: 'Basic Info',
      infoText:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem obcaecati ipsa laudantium pariatur amet illo repellendus neque error quisquam, porro mollitia quae est placeat, consequuntur aliquid ex ipsum exercitationem aspernatur! Velsaepe molestias facere, distinctio sint cum reprehenderit omnis nobis eveniet explicabo voluptatem magnam quae id placeat tenetur ad ratione fuga soluta excepturi quo. Cupiditate, commodi iusto. Atque, neque aspernatur.',
      //TODO: format this so code will display properly
      codeExample:
        '\nbubbleSort(arr) {\n\tfor (let i = arr.length; i > 0; i--) {\n\t\tfor (var j = 0; j < i - 1; j++) {\n\t\t\tif (arr[j] > arr[j + 1]) {\n\t\t\t\tlet temp = arr[j];\n\t\t\t\tarr[j] = arr[j + 1];\n\t\t\t\tarr[j + 1] = temp;\n\t\t\t}\n\t\t}\n\t}\n}',
      sortArray: [6, 30, 21, 9, 5, 18, 35, 47, 19, 3, 41, 15, 29, 31, 7, 45, 30, 8, 14, 28],
      selectedElement: 0,
      sortedElement: 100,
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  methods: {
    toggleInfoCode() {
      this.displayCode = !this.displayCode;
    },
    async runCode() {
      this.cardRotate = '[transform:rotateY(180deg)]';
      await this.delay(1000);
      this.bubbleSort(this.sortArray);
    },
    flipToFront() {
      this.cardRotate = '';
    },
    async bubbleSort(arr) {
      for (let i = arr.length; i > 0; i--) {
        for (var j = 0; j < i - 1; j++) {
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
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<style scoped></style>
