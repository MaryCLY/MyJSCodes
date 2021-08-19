// weighting quick union with path compression
class Node {
    constructor(parent, size){
        this.parent = parent || null;
        this.size = size || 0;
    }
}

function union(map, p, q){
    if(isConnected(map, p, q)){
        return;
    }
    if(!map.has(p)||!map.has(q)){
        //有一个不在map里，说明是游离节点，自动设为child
        if(!map.has(p)){
            var child = p, parent = find(map, q);
        } else {
            var child = q, parent = find(map, p);
        }
        map.set(child, new Node(parent, 0));
    } else {
        //均存在map中，需要进行weighting的两个节点
        var pr = find(map, p), qr = find(map, q), prs = map.get(pr).size, qrs = map.get(qr).size;
        if(prs < qrs){
            var child = pr, parent = qr;
        } else {
            var child = qr, parent = pr;
        }
        //root应该都存在map中
        map.get(child).parent = parent;
    }
    if(!map.has(parent)){
        map.set(parent, new Node(parent, map.get(child).size+1)); //map中新建一个root node
    } else {
        map.get(parent).size+=map.get(child).size+1; //合并size
    }
};

function find(map, p){
    if(!map.has(p)){
        return p;
    }
    while(map.get(p).parent!=p){
        p = map.get(p).parent;
    }
    return p;
};

function isConnected(map, p, q){
    return (find(map, p)===find(map, q));
}

function unionAllIntoMap(map, arr){
    if(!map||!arr){
        return;
    }
    if(!arr.length||arr[0].length!=2){
        return;
    }
    for(const pair of arr){
        union(map, pair[0], pair[1]);
    }
}

// function unionByInput(map, count, str){
//     let arr = str.split(' ');
//     for(let i=0;count>0;count--){
//         union(map, Number(arr[i++]), Number(arr[i++]));
//     }
// }

// const map = new Map();