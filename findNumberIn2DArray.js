/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var findNumberIn2DArray = function(matrix, target) {
    const rows = matrix.length;
    if(!rows){
        return false;
    }
    const columns = matrix[0].length;
    if(!columns){
        return false;
    }
    for(let r=0; r<rows; r++){
        if(matrix[r][0]>target){
            return false;
        }
        if(matrix[r][rows-1]<target){
            continue;
        }
        let find = binarySearch(matrix[r], 0, columns, target);
        if(find!=-1){
            return true;
        }
    }
    return false;
};

function binarySearch(arr, start, end, target){
    if(start>=end){
        return -1;
    }
    const center = start + Math.floor((end-start)/2);
    if(target==arr[center]){
        return center;
    } else if (target<arr[center]){
        return binarySearch(arr, start, center, target);
    } else {
        return binarySearch(arr, center+1, end, target);
    }
}

console.log(findNumberIn2DArray ([[-1,3]],3))