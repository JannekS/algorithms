<template>
  <div class="h-screen w-full flex flex-row items-center justify-center">
    <!-- Front & Back Side Container-->
    <div class="w-10/12 h-2/3 max-w-lg 2xl:h-1/2 group [perspective:900px]">
      <!-- Inner Container -->
      <div
        id="card-container"
        class="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
      >
        <!-- front side -->
        <div class="absolute rounded-lg w-full h-full bg-slate-700 [backface-visibility:hidden]">
          <div class="flex flex-col w-full h-full">
            <!-- Card Header -->
            <div class="w-full border-b border-b-slate-500 flex flex-row items-center">
              <!-- Iconic Buttons -->
              <div class="rounded-full h-2 w-2 ml-2 shrink-0 bg-red-500"></div>
              <div class="rounded-full h-2 w-2 ml-1 shrink-0 bg-yellow-400"></div>
              <div class="rounded-full h-2 w-2 ml-1 shrink-0 bg-green-500"></div>
              <!-- Card Heading -->
              <div class="ml-4 py-2 text-slate-400">
                <h2 class="text-lg font-bold">{{ cardHeading }}</h2>
              </div>
            </div>
            <!-- Card Main Content -->
            <div
              class="flex-auto text-slate-200 p-2 border-b border-b-slate-500 overflow-y-auto md:px-4"
            >
              <div id="code-info" :class="displayInfo">
                <h2 class="text-lg font-bold font-mono">{{ infoTitle }}</h2>
                <p>
                  {{ infoText }}
                </p>
              </div>
              <div id="code-example" class="text-xs md:text-sm" :class="displayCode">
                <pre>
                    <code class="font-mono">
                        {{ codeExample }}
                    </code>
                  </pre>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="relative bottom-0 left-0 w-full flex flex-row justify-between">
              <!-- Left Button -->
              <div class="flex">
                <base-button
                  :value="frontBtnValue"
                  :imgUrl="frontBtnImg"
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
            </div>
          </div>
        </div>
        <!-- Back Side -->
        <div
          class="absolute rounded-lg w-full h-full bg-slate-700 [transform:rotateY(180deg)] [backface-visibility:hidden]"
        >
          <div class="flex flex-col w-full h-full">
            <!-- Back Header -->
            <div class="w-full border-b border-b-slate-500 flex flex-row items-center">
              <!-- Iconic Buttons -->
              <div class="rounded-full h-2 w-2 ml-2 shrink-0 bg-red-500"></div>
              <div class="rounded-full h-2 w-2 ml-1 shrink-0 bg-yellow-400"></div>
              <div class="rounded-full h-2 w-2 ml-1 shrink-0 bg-green-500"></div>
              <div class="ml-4 py-2 text-slate-400">
                <h2 class="text-lg font-bold">Output</h2>
              </div>
            </div>
            <!-- Back Main Content -->
            <div
              class="flex-auto text-xs font-mono text-slate-200 p-2 h-80 border-b border-b-slate-500"
            >
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
            </div>
            <!-- Back Footer -->
            <div class="relative bottom-0 left-0 w-full flex flex-row justify-between">
              <div>
                <!-- Back Right Button -->
                <button id="back-btn" class="card-button">
                  <img src="/icons/backward-fast-solid.svg" alt="run code" class="w-4 h-4" />
                  <span class="hidden md:flex">Go Back</span>
                </button>
              </div>
              <!-- Back Left Buttons -->
              <div class="flex flex-row">
                <button class="card-button">
                  <img src="/icons/repeat-solid.svg" alt="repeat" class="w-4 h-4" />
                  <span class="hidden md:flex">Replay</span>
                </button>
                <button class="card-button">
                  <img src="/icons/shuffle-solid.svg" alt="randomize" class="w-4 h-4" />
                  <span class="hidden md:flex">Shuffle Array</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
export default {
  name: 'CodeCard',
  components: { BaseButton },
  data() {
    return {
      frontContent: 'info',
      frontBtnValue: 'Show Code',
      frontBtnImg: '/icons/code-solid.svg',
      displayInfo: '',
      displayCode: 'hidden',
      cardHeading: 'Simple for-loop',
      infoTitle: 'Basic Info',
      infoText:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem obcaecati ipsa laudantium pariatur amet illo repellendus neque error quisquam, porro mollitia quae est placeat, consequuntur aliquid ex ipsum exercitationem aspernatur! Velsaepe molestias facere, distinctio sint cum reprehenderit omnis nobis eveniet explicabo voluptatem magnam quae id placeat tenetur ad ratione fuga soluta excepturi quo. Cupiditate, commodi iusto. Atque, neque aspernatur.',
      //TODO: format this so code will display properly
      codeExample: `for (i = 0; i &lt; 10; i++) {  
    console.log("Hello World!");
    console.log("I like code!");
}`,
    };
  },
  methods: {
    toggleInfoCode() {
      if (this.frontContent === 'info') {
        this.frontContent = 'code';
        this.frontBtnValue = 'Show Info';
        this.frontBtnImg = '/icons/info-solid.svg';
        this.displayCode = 'block';
        this.displayInfo = 'hidden';
      } else {
        this.frontContent = 'info';
        this.frontBtnValue = 'Show Code';
        this.frontBtnImg = '/icons/code-solid.svg';
        this.displayCode = 'hidden';
        this.displayInfo = '';
      }
    },
    runCode() {
      console.log('This click will flip the card soon.');
    },
  },
};
</script>

<style scoped>
.card-button {
  @apply flex flex-row text-xs text-black justify-center items-center p-2 space-x-2 font-mono rounded-lg bg-lime-600 m-2 hover:bg-lime-500;
}
</style>
