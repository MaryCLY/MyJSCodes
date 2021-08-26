/** 公用函数*/
/**
 * Generate random array of integers
 * @param {Number} length 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number[]}
 */
function generate(length, min, max) {
    if (min === undefined || max === undefined) {
        min = 0; max = 100;
    }
    return Array.from({ length: length }, v => Math.floor(Math.random() * (max - min)) + min);
}

/**
 * Show array in console
 * @param {Number[]} arr 
 */
function show(arr) {
    console.log(...arr);
}

/**
 * Swap two numbers in array
 * @param {Number[]} arr array
 * @param {Number} i first index
 * @param {Number} j sec index
 */
function swap(arr, i, j) {
    if (i == j) return; //加入一步判断i, j是否相同
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

/**
 * Whether the array is completely sorted (asc limited)
 * @param {Number[]} arr array
 * @param {String}
 * @returns {Boolean}
 */
function isSorted(arr) {
    for (let i = 1, len = arr.length; i < len; i++) {
        //搜索范围1~len-1
        if (arr[i - 1] > arr[i]) {
            return false;//只要有一个不守秩序，判断为false
        }
    }
    return true; //否则判断为true
}

/**
 * Find the smallest value's index in array
 * @param {Number[]} arr array
 * @param {Number} start start index
 * @returns {Number} smallest value's index
 */
function getSmallest(arr, start) {
    let minIndex = start;
    for (let i = start + 1, len = arr.length; i < len; i++) {
        //搜索范围start+1~len-1（默认的最小值索引是start）
        if (arr[i] < arr[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}

/**
 * Find the smallest value's index in array, and also examine whether the array is sorted
 * @param {Number[]} arr array
 * @param {Number} start start index
 * @returns {Number} if is sorted, return -1
 */
function getSmallestAndIsSorted(arr, start) {
    let minIndex = start, sorted = true;
    for (let i = start + 1, len = arr.length; i < len; i++) {
        //搜索范围start+1~len-1（默认的最小值索引是start）
        if (arr[i] < arr[minIndex]) {
            minIndex = i;
            sorted = false; //存在交换一定不是排序好的
        }
        if (sorted && arr[i - 1] > arr[i]) {
            sorted = false; //如果尚未判断sorted = false，且存在两个数倒序的情况，判断sorted = false
        }
    }
    if (sorted) {
        return -1; //判断是否已经是升序，如果是则返回-1提示
    } else {
        return minIndex;
    }
}

/**
 * Selection sort function
 * @param {Number[]} arr array to be sorted
 */
function selectionSort(arr) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        //交换到最后一轮时一定是最大的数，故忽略
        let min = getSmallest(arr, i);
        swap(arr, i, min);
    }
}

/**
 * Better selection sort function
 * @param {Number[]} arr array to be sorted
 */
function selectionSortPlus(arr) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        //交换到最后一轮时一定是最大的数，故忽略
        let min = getSmallestAndIsSorted(arr, i);
        if (min == -1) {
            break;
        } else {
            swap(arr, i, min);
        }
    }
}

/**
 * Sink a small node to lowest place
 * @param {Number[]} arr array of a heap
 * @param {Number} len the length that sinking can reach (no need to reach further)
 * @param {Number} tar target index for a sinking node
 * @returns {void}
 */
function sink(arr, len, tar) {
    // 将某个较小的节点下沉到可以下沉的最低的位置
    const child = [];
    if (tar * 2 + 1 < len) {
        child.push(tar * 2 + 1); // 获取左孩子
        if (tar * 2 + 2 < len) {
            child.push(tar * 2 + 2); // 获取右孩子
        }
    }
    const child_num = child.length;
    if (!child_num) {
        return;
    } else if (child_num == 1) {
        var max = child[0];
    } else {
        if (arr[child[0]] > arr[child[1]]) {
            var max = child[0];
        } else {
            var max = child[1];
        }
    } // 获取较大的孩子
    if (arr[tar] < arr[max]) {
        // 如果小于自己的孩子，进行交换，并进一步下沉
        swap(arr, tar, max);
        sink(arr, len, max);
    }
}

/**
 * Adjust the complete binary tree of an array to max heap
 * @param {Number[]} arr target array
 */
function buildMaxHeap(arr) {
    const len = arr.length;
    const mid = Math.floor(len / 2);
    for (let i = mid; i >= 0; i--) {
        sink(arr, len, i);  // 对前半部分的节点进行下沉
    }
}

/**
 * Heap sort function
 * @param {Number[]} arr array to be sorted
 */
function heapSort(arr) {
    buildMaxHeap(arr);
    let len = arr.length;
    while (len > 1) {
        swap(arr, 0, --len); // 把最大的放到最后（并忽略掉），然后把最后一位的移上去
        sink(arr, len, 0); // 对根节点进行下沉（忽略最后已排好序的节点）
    }
}

/**
 * Insertion sort function
 * @param {Number[]} arr array
 * @returns {void}
 */
function insertionSort(arr) {
    for (let i = 1, len = arr.length; i < len; i++) {
        // i: 整齐序列的终止处，以及需要查找插入的数所在的索引
        for (let j = i; j > 0 && (arr[j] < arr[j - 1]); j--) {
            swap(arr, j, j - 1);  // 将顺序不对的交换
        }
    }
}

/**
 * Better insertion sort function
 * @param {Number[]} arr array
 * @returns {void}
 */
function insertionSortPlus(arr) {
    for (let i = 1, len = arr.length; i < len; i++) {
        // i: 整齐序列的终止处，以及需要查找插入的数所在的索引
        if (arr[i] >= arr[i - 1]) {
            // 如果arr[i]>=arr[i-1] 只要后面是正序，整体一定是正序
            if (isSorted(arr.slice(i))) {
                return; // 判断arr是否已经排序好，以免重复排序
            } else {
                continue; // 否则只是不需要插入了
            }
        }
        let num = arr[i];
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] <= num) {
                arr[j + 1] = num;  // 在临界点插入num
                break;
            } else {
                arr[j + 1] = arr[j];  // 不在临界点，进行一次后移
                if (j == 0) {
                    arr[j] = num;  // 可以视为arr[-1]<=num, arr[0]=num;（临界点是-1,0)
                }
            }
        }
    }
}

/**
 * Shell sort function
 * @param {Number[]} arr array to be sorted
 */
function shellSort(arr) {
    // 采用了Algorithms书上采用的步长 h(n)=h(n-1)*3+1
    const len = arr.length;
    let h = 1;
    while (h < Math.floor(len / 3)) {
        h = h * 3 + 1; // 在1, 4, 13, 40, 121, 364, 1093, ...中取到最接近len/3的最大步长
    }
    while (h >= 1) {
        for (let i = h; i < len; i++) {
            // 将arr[i]对数组arr[i-h:i]进行插入
            for (let j = i; j > 0 && (arr[j] < arr[j - 1]); j--) {
                swap(arr, j, j - 1);
            }
        }
        h = Math.floor(h / 3);
    }
}

/**
 * Shell sort function from wikipedia
 * @param {Number[]} arr array to be sorted
 */
function shellSortWiki(arr) {
    // 采用了Algorithms书上采用的步长 h(n)=h(n-1)*3+1
    const len = arr.length;
    let h = 1;
    while (h < Math.floor(len / 3)) {
        h = h * 3 + 1; // 在1, 4, 13, 40, 121, 364, 1093, ...中取到最接近len/3的最大步长
    }
    while (h >= 1) {
        for (let i = 0; i < len; i += h) {
            // 对arr[i:i+h]进行整体的插入排序
            for (let j = i + 1; j < i + h; j++) {
                for (let k = j; k > 0 && (arr[k] < arr[k - 1]); k--) {
                    swap(arr, k, k - 1);
                }
            }
        }
        h = Math.floor(h / 3);
    }
}

/**
 * Merge function for mergesort from one array
 * @param {Number[]} arr array to merge
 * @param {Number} start index to start from (included)
 * @param {Number} mid divide two parts of array (included to the right one)
 * @param {Number} end index to end with (excluded)
 * @returns
 */
function mergeFromArray(arr, start, mid, end) {
    const lArr = arr.slice(start, mid), rArr = arr.slice(mid, end);
    let i = 0, j = 0;
    let arr_cur = start;
    const lLen = lArr.length, rLen = rArr.length;
    while (i < lLen || j < rLen) {
        if (lArr[i] <= rArr[j] || j == rLen) {
            arr[arr_cur] = lArr[i];
            i++;
            arr_cur++;
        } else {
            arr[arr_cur] = rArr[j];
            j++;
            arr_cur++;
        }
    }
}

/**
 * Merge sort function (recursive)
 * @param {Number[]} arr array to be sorted
 * @param {Number} start index to start from (included)
 * @param {Number} end index to end with (excluded)
 * @returns 
 */
function mergeSort(arr, start, end) {
    if (end === undefined) {
        end = arr.length;
        if (start === undefined) {
            start = 0;
        }
    }// 未输入start和end时，取整个数组；仅输入start时，取start及以后
    if (end - start <= 1) {
        return; //数组长度只剩1的时候return（2拆分会变成两个1）
    }
    let mid = Math.floor((end - start) / 2) + start;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid, end);
    mergeFromArray(arr, start, mid, end);
}

/**
 * Bottom-up mergesort function (iterative)
 * @param {Number[]} arr array to be sorted
 */
function mergeSortBU(arr) {
    const len = arr.length;
    for (let size = 1; size < len; size += size) {
        // size 每次翻倍，直到大于len
        for (let start = 0; start < len - size; start += size + size) {
            // 每size*2的数组分成两半做一次合并
            mergeFromArray(arr, start, start + size, Math.min(start + size + size, len)); // 如果两倍size超过length了，右边一半的end只取到length
        }
    }
}

/**
 * Bubble sort function
 * @param {Number[]} arr array to be sorted
 */
function bubbleSort(arr) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                swap(arr, j + 1, j);
            }
        }
    }
}

/**
 * Better bubble sort function
 * @param {Number[]} arr array to be sorted
 */
function bubbleSortPlus(arr) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        let count = 0; // 计算交换次数
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                swap(arr, j + 1, j);
                count++;
            }
        }
        if (!count) {
            return; //如果没有交换，说明顺序正确
        }
    }
}

/**
 * Quick sort function
 * @param {Number[]} arr array to be sorted
 * @param {Number} start index to start sorting from (default: 0, included)
 * @param {Number} end index to end sorting from (default: arr.length, excluded)
 * @returns 
 */
function quickSort(arr, start, end) {
    if (end === undefined) {
        end = arr.length;
        if (start === undefined) {
            start = 0;
        }
    }// 未输入start和end时，取整个数组；仅输入start时，取start及以后
    const len = end - start;
    if (len <= 1) {
        return; // 数组长度为1时，返回
    }
    const pivot = arr[start];
    let i = start, j = end;
    while(true){
        while(arr[++i] <= pivot){
            // 从左开始停在第一个大于pivot的值
            if(i==end){
                break; // 处理边界条件
            }
        }
        while(arr[--j] >= pivot){
            // 从右开始停在第一个小于pivot的值
            if(j==start){
                break;
            }
        }
        if(i>=j){
            break;
        }
        swap(arr, i, j); // 交换两个值
    }
    swap(arr, start, j); // 将基准值摆在中间（和左集合中最右边的数交换）
    // show(arr);
    quickSort(arr, start, j); // 排序左集合
    quickSort(arr, j + 1, end); // 排序右集合
}

/**
 * 3-way quick sort function (applied to array consisting of many same values)
 * @param {Number[]} arr array to be sorted
 * @param {Number} start index to start sorting from (default: 0, included)
 * @param {Number} end index to end sorting from (default: arr.length, excluded)
 * @returns 
 */
 function quick3Way(arr, start, end) {
    if (end === undefined) {
        end = arr.length;
        if (start === undefined) {
            start = 0;
        }
    }// 未输入start和end时，取整个数组；仅输入start时，取start及以后
    const len = end - start;
    if (len <= 1) {
        return; // 数组长度为1时，返回
    }
    const pivot = arr[start];
    let left = start, cur = start + 1, right = end -1;
    while(cur <= right){
        // right右边的都是大于pivot的，故不需要再检查
        if(arr[cur]<pivot){
            // 小于基准值，移到左边
            swap(arr, cur++, left++); // 因为left<cur, left一定是小于等于pivot的，不需要再次检查
        } else if (arr[cur]>pivot){
            // 大于基准值，移到右边
            swap(arr, cur, right--); // right的值还不知道，需要再次检查
        } else {
            // 等于基准值，不需要移动
            cur++;
        }
    }
    // 中间的部分都是等于pivot的
    quick3Way(arr, start, left); // 排序左集合
    quick3Way(arr, right + 1, end); // 排序右集合
}

let arr = generate(10, 0, 100);
// let repeatArr = [1,2,1,3,1,2,3,1,2,3,3,2,9,9,9,3,9,2,9];
show(repeatArr);
console.time("test_sort");
// selectionSort(arr);
// insertionSort(arr);
// insertionSortPlus(arr);
// shellSortWiki(arr);
// mergeSortBU(arr);
// bubbleSort(arr);
// heapSort(arr);
// quickSort(arr);
// quickSort(repeatArr);
// quick3Way(repeatArr);
console.timeEnd("test_sort");
show(repeatArr);