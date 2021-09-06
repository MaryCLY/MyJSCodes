/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    const pivot = numbers[0];
    //直接从左到右消去重复值
    let count = 0;
    for (const len = numbers.length; count < len && numbers[count] === pivot; count++) {
    }
    numbers.splice(0, count - 1);
    const res = binarySearch(numbers, 1, numbers.length, pivot);
    if (res === numbers.length) {
        //没有旋转
        return pivot;
    }

    return numbers[res];
};

function binarySearch(arr, start, end, pivot) {
    if (start >= end) {
        return start;
    }
    const center = start + Math.floor((end - start) / 2);
    if (arr[center] <= pivot) {
        return binarySearch(arr, start, center, pivot);
    } else {
        return binarySearch(arr, center + 1, end, pivot);
    }
}
console.log(minArray([3,3,3,1,2]))