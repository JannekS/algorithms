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
  colorMarkers.selectedElement = -1;
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
  colorMarkers.selectedElement = -1;
  colorMarkers.swapElement = -1;
  colorMarkers.minElement = -1;
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

// Merge Sort
async function mergeSort(arr, colorMarkers, sortedElements, dividedElements) {
  // let divOrderArr = [8, 4, 2, 1, 3, 4];
  const leftArrSplices = [
    [0, 1],
    [2, 3],
    [0, 2],
    [4, 5],
    [6, 7],
    [4, 6],
    [0, 4],
    [8, 9],
    [10, 11],
    [8, 10],
    [12, 13],
    [14, 15],
    [12, 14],
    [8, 12],
    [0, 8],
  ];
  const rightArrSplices = [
    [1, 2],
    [3, 4],
    [2, 4],
    [5, 6],
    [7, 8],
    [6, 8],
    [4, 8],
    [9, 10],
    [11, 12],
    [10, 12],
    [13, 14],
    [15, 16],
    [14, 16],
    [12, 16],
    [8, 16],
  ];
  // for (let i = 0; i < divOrderArr.length; i++) {
  //   colorMarkers.selectedElement = divOrderArr[i];
  //   await delay(300);
  //   dividedElements.push(divOrderArr[i]);
  //   await delay(300);
  // }
  await delay(300);
  colorMarkers.selectedElement = -1;
  for (let i = 0; i < leftArrSplices.length; i++) {
    // dividedElements.push(rightArrSplices[i][0]);
    await merge(arr, leftArrSplices[i], rightArrSplices[i], colorMarkers, sortedElements);
    // dividedElements.pop();
  }
}

async function merge(arr, leftArrSplice, rightArrSplice, colorMarkers, sortedElements) {
  let leftArr = arr.slice(leftArrSplice[0], leftArrSplice[1]);
  let rightArr = arr.slice(rightArrSplice[0], rightArrSplice[1]);
  let i = leftArrSplice[0];
  let leftIdx = 0;
  let rightIdx = 0;
  colorMarkers.selectedElement = i;

  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    if (leftArr[leftIdx] < rightArr[rightIdx]) {
      arr[i] = leftArr[leftIdx];
      leftIdx++;
      sortedElements.push(i);
      i++;
      colorMarkers.selectedElement = i;
    } else {
      arr[i] = rightArr[rightIdx];
      rightIdx++;
      sortedElements.push(i);
      i++;
      colorMarkers.selectedElement = i;
    }
    await delay(300);
  }
  while (leftIdx < leftArr.length) {
    arr[i] = leftArr[leftIdx];
    leftIdx++;
    sortedElements.push(i);
    i++;
    colorMarkers.selectedElement = i;
  }
  await delay(300);
  while (rightIdx < rightArr.length) {
    arr[i] = rightArr[rightIdx];
    rightIdx++;
    sortedElements.push(i);
    i++;
    colorMarkers.selectedElement = i;
  }
  await delay(300);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { bubbleSort, selectionSort, insertionSort, mergeSort, merge, delay };
