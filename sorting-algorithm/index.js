// creating sample generator
const buildSample = n => [...Array(n)].map((_, i) => i + 1).sort(() => Math.random() - 0.5)

// creating test function
const test = (func, data) => {
  let dataCopy = [...data]
  const start = performance.now()
  func(dataCopy)
  const end = performance.now()
  return (end - start).toFixed(4) + " ms"
}

// base data
const result = [
  { sort: bubbleSort },
  { sort: insertionSort },
  { sort: selectionSort },
  { sort: mergeSort },
  { sort: quickSort },
]

// test
for (let i = 0; i < 5; i++) {
  const length = Math.pow(10, i + 1)
  const name = length + " samples"
  const sample = buildSample(length)

  result.forEach(j => j[name] = test(j.sort, sample))
}
console.table(result)

// bubble sort
function bubbleSort(arr){
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if(arr[j + 1] < arr[j]){
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr
}

// insertion sort
function insertionSort(arr){
  for (let i = 0; i < arr.length; i++) {
    let j = i - 1
    let temp = arr[i]
    while(j >= 0 && arr[j] > temp){
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = temp
  }
  return arr
}

// selection sort
function selectionSort(arr){
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[min]){
        min = j
      }
    }
    if(min !== i){
      [arr[i], arr[min]] = [arr[min], arr[i]]
    }
  }
  return arr
}

// merge sort
function mergeSort(arr){
  if(arr.length <= 1){
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  const result = []
  let i = 0
  let j = 0
  while(i < left.length && j < right.length){
    if(left[i] < right[j]){
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)]
}

// quick sort
function quickSort(arr){
  if(arr.length <= 1){
    return arr
  }

  const pivot = arr[arr.length - 1]
  const left = []
  const right = []
  for(let i = 0; i < arr.length - 1; i++){
    if(arr[i] < pivot){
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}