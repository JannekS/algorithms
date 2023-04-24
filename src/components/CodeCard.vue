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
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
            <p>> Hello World!</p>
            <p>> I like code!</p>
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
      cardHeading: 'Simple for-loop',
      infoTitle: 'Basic Info',
      infoText:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem obcaecati ipsa laudantium pariatur amet illo repellendus neque error quisquam, porro mollitia quae est placeat, consequuntur aliquid ex ipsum exercitationem aspernatur! Velsaepe molestias facere, distinctio sint cum reprehenderit omnis nobis eveniet explicabo voluptatem magnam quae id placeat tenetur ad ratione fuga soluta excepturi quo. Cupiditate, commodi iusto. Atque, neque aspernatur.',
      //TODO: format this so code will display properly
      codeExample: `\nfor (i = 0; i < 10; i++) { \n\tconsole.log("Hello World!"); \n\tconsole.log("I like code!");\n}`,
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  methods: {
    toggleInfoCode() {
      this.displayCode = !this.displayCode;
    },
    runCode() {
      // TODO: Trigger animation on the back side.
      this.cardRotate = '[transform:rotateY(180deg)]';
    },
    flipToFront() {
      this.cardRotate = '';
    },
  },
};
</script>

<style scoped>
.card-button {
  @apply flex flex-row text-xs text-black justify-center items-center p-2 space-x-2 font-mono rounded-lg bg-lime-600 m-2 hover:bg-lime-500;
}
</style>

function flipCard() { cardContainer.classList.toggle("[transform:rotateY(180deg)]"); }
