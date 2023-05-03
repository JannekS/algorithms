async function bubbleSort(arr, colorMarkers, sortedElements) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      sortedElements.push(i);
      colorMarkers.selectedElement = j;
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        colorMarkers.selectedElement = j + 1;
      }
      await delay(300);
    }
  }
  sortedElements.push(1);
  sortedElements.push(0);
}

async function selectionSort(arr, colorMarkers, sortedElements) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    colorMarkers.minElement = i;
    colorMarkers.swapElement = i;
    for (let j = i + 1; j < arr.length; j++) {
      colorMarkers.selectedElement = j;
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        colorMarkers.minElement = j;
      }
      await delay(300);
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    colorMarkers.minElement = i;
    colorMarkers.swapElement = minIndex;
    await delay(500);
    sortedElements.push(i);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { bubbleSort, selectionSort, delay };
