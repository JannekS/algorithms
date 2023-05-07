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

async function insertionSort(arr, colorMarkers, sortedElements) {
  sortedElements.push(0);
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    colorMarkers.selectedElement = i;
    await delay(300);
    colorMarkers.selectedElement = -1;
    colorMarkers.insertionElement = currentValue;
    let j = i - 1;
    while (j >= 0 && arr[j] > currentValue) {
      await delay(300);
      arr[j + 1] = arr[j];
      colorMarkers.swapElement = j + 1;
      j--;
    }
    await delay(300);
    arr[j + 1] = currentValue;
    colorMarkers.selectedElement = j + 1;
    colorMarkers.insertionElement = 0.01;
    await delay(300);
    sortedElements.push(i);
  }
  colorMarkers.selectedElement = -1;
  colorMarkers.swapElement = -1;
  colorMarkers.insertionElement = 0;
  return arr;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { bubbleSort, selectionSort, insertionSort, delay };
