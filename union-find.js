// weighting quick union with path compression
const map = new Map();
class Node {
    //每个节点保存的结构
    constructor(parent, size){
        this.parent = parent || null;
        this.size = size || 0;
    }
}

function union(p, q){
    if(!map.has(p)||!map.has(q)){
        //有一个不在map里，说明是游离节点，自动设为child
        if(!map.has(p)){
            var child = p, parent = find(q); //path compression 父母直接设给根节点
        } else {
            var child = q, parent = find(p);
        }
        map.set(child, new Node(parent, 0));
    } else {
        //均存在map中，需要进行weighting的两个节点
        const pr = find(p), qr = find(q), prs = map.get(pr).size, qrs = map.get(qr).size; //暂存两个节点的root
        if(pr===qr){
            //如果已经连通，不需要再连接了
            return;
        }
        if(prs < qrs){
            //把容量更小的那个设为child被合并
            var child = pr, parent = qr;
        } else {
            var child = qr, parent = pr;
        }
        //root应该都存在map中
        map.get(child).parent = parent;
    }
    if(!map.has(parent)){
        map.set(parent, new Node(parent, map.get(child).size+1)); //map中新建一个root node，root的parent设给自己
    } else {
        map.get(parent).size+=map.get(child).size+1; //合并size
    }
};

function find(p){
    if(!map.has(p)){
        return p;
    }
    while(map.get(p).parent!=p){
        //如果parent等于自己，说明已经是根节点了，否则再往上追溯一个parent
        p = map.get(p).parent;
    }
    return p;
};

function isConnected(p, q){
    return (find(p)===find(q));
}

function unionAllIntoMap(arr){
    if(!map||!arr){
        return;
    }
    if(!arr.length||arr[0].length!=2){
        return;
    }
    for(const pair of arr){
        union(pair[0], pair[1]);
    }
}

function unionByInput(count, str){
    let arr = str.split(' ');
    for(let i=0;count>0;count--){
        union(Number(arr[i++]), Number(arr[i++]));
    }
}

unionByInput(3, "1 2 3 4 1 5");

console.log(find(1));