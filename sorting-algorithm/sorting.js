// creating sample generator
const buildSample = n => [...Array(n)].map((_, i) => i + 1).sort(() => Math.random() - 0.5)

// creating test function
const test = (func, data) => {
  let dataCopy = [...data]
  let start = performance.now()
  func(dataCopy)
  let end = performance.now()
  return (end - start).toFixed(4) + " ms"
}

// base data
const result = [
  { sort: bubbleSort, },
  { sort: insertionSort, },
  { sort: selectionSort, },
  { sort: mergeSort, },
  { sort: quickSort, },
];

// test
for (let i = 0; i < 4; i++) {
  const length = Math.pow(10, i+1)
  const thisSample = buildSample(length)

  result.forEach(j => j[length] = test(j.sort, thisSample))
}
console.table(result)

// build bubble sort function
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr
}

// build insertion sort function
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j > -1; j--) {
      if (arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr;
}

// build selection sort function
function selectionSort(arr) {
  let min;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

// build merge sort function
function mergeSort(array) {
  const n = array.length;
  if (n <= 1) {
    return array;
  }
  const mid = Math.floor(n / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// build quick sort function
function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const pivot = array[array.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}