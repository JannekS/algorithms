<template>
  <li v-for="algorithmObj in algorithmData" :key="algorithmObj.id">
    <algorithm-btn :algorithm="algorithmObj.name" />
  </li>
  <code-card :algorithmData="algorithmData.selectionSort" />
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
      // algorithms: {
      //   bubbleSort: {
      //     name: 'bubbleSort',
      //     description:
      //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem obcaecati ipsa laudantium pariatur amet illo repellendus neque error quisquam, porro mollitia quae est placeat, consequuntur aliquid ex ipsum exercitationem aspernatur! Velsaepe molestias facere, distinctio sint cum reprehenderit omnis nobis eveniet explicabo voluptatem magnam quae id placeat tenetur ad ratione fuga soluta excepturi quo. Cupiditate, commodi iusto. Atque, neque aspernatur.',
      //     complexity: 'n^2',
      //     codeString:
      //       '\nbubbleSort(arr) {\n\tfor (let i = arr.length; i > 0; i--) {\n\t\tfor (var j = 0; j < i - 1; j++) {\n\t\t\tif (arr[j] > arr[j + 1]) {\n\t\t\t\tlet temp = arr[j];\n\t\t\t\tarr[j] = arr[j + 1];\n\t\t\t\tarr[j + 1] = temp;\n\t\t\t}\n\t\t}\n\t}\n}',
      //     async runCode(arr, colorMarkers) {
      //       for (let i = arr.length; i > 0; i--) {
      //         for (let j = 0; j < i - 1; j++) {
      //           if (this.reset) {
      //             return;
      //           }
      //           colorMarkers.sortedElement = i;
      //           colorMarkers.selectedElement = j;
      //           if (arr[j] > arr[j + 1]) {
      //             let temp = arr[j];
      //             arr[j] = arr[j + 1];
      //             arr[j + 1] = temp;
      //             colorMarkers.selectedElement = j + 1;
      //           }
      //           await this.delay(300);
      //         }
      //       }
      //       colorMarkers.sortedElement = 0;
      //     },
      //   },
      //   selectionSort: {
      //     name: 'selectionSort',
      //     description:
      //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem obcaecati ipsa laudantium pariatur amet illo repellendus neque error quisquam, porro mollitia quae est placeat, consequuntur aliquid ex ipsum exercitationem aspernatur! Velsaepe molestias facere, distinctio sint cum reprehenderit omnis nobis eveniet explicabo voluptatem magnam quae id placeat tenetur ad ratione fuga soluta excepturi quo. Cupiditate, commodi iusto. Atque, neque aspernatur.',
      //     complexity: 'n^2',
      //     codeString:
      //       'selectionSort(arr) {\nfor (let i = 0; i < arr.length; i++) {\n\tlet minIndex = i;\n\tfor (let j = i + 1; j < arr.length; j++) {\n\t\tif (arr[j] < arr[minIndex]) {\n\t\t\tminIndex = j;\n\t\t}\n\t}\n\tif (minIndex !== i) {\n\t\tlet temp = arr[i];\n\t\tarr[i] = arr[minIndex];\n\t\tarr[minIndex] = temp;\n\t}\n}',
      //     async runCode(arr, colorMarkers) {
      //       for (let i = 0; i < arr.length; i++) {
      //         let minIndex = i;
      //         colorMarkers.minElement = i;
      //         colorMarkers.swapElement = i;
      //         for (let j = i + 1; j < arr.length; j++) {
      //           if (this.reset) {
      //             return;
      //           }
      //           colorMarkers.selectedElement = j;
      //           if (arr[j] < arr[minIndex]) {
      //             minIndex = j;
      //             colorMarkers.minElement = j;
      //           }
      //           await this.delay(300);
      //         }
      //         if (minIndex !== i) {
      //           let temp = arr[i];
      //           arr[i] = arr[minIndex];
      //           arr[minIndex] = temp;
      //         }
      //         colorMarkers.minElement = i;
      //         colorMarkers.swapElement = minIndex;
      //         await this.delay(500);
      //         colorMarkers.sortedElement = i;
      //       }
      //     },
      //   },
      // },
    };
  },
};
</script>

<style scoped></style>
