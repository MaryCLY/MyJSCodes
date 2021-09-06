
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} 
 * @return {boolean}
 */

 var isSymmetric = function(root) {
    if(root==null){
        return true;
    }
    let queue1 = [root.left,root.right];
    while(true){
        let queue2 = [];
        let queue3 = [];
        while(queue1.length){
            let node1 = null;
            let node2 = null;
            node1 = queue1.shift();
            node2 = queue1.pop();
            if((node1!=null&&node2!=null&&node1.val!=node2.val)||(node1==null&&node1!=node2)||(node2==null&&node2!=node1)){
                return false;
            }
            if(node1!=null){
                queue2.push(node1.left,node1.right);
            }
            if(node2!=null){
                queue3.unshift(node2.left,node2.right);
            }
        }
        // queue1.concat(queue2);
        // queue1 = queue2.push.apply(queue2,queue3);
        queue2.push(...queue3);
        queue1 = queue2;
        if (!queue2.length){
            break;
        }
    }
    return true;
};
var getTreeFromArray = function(arr){
    if(!arr.length||arr[0]==null){
        return null;
    }
    const nodes = [];
    for(let i=0; i<arr.length; i++){
        if(arr[i]!=null){
            nodes[i]=new TreeNode(parseInt(arr[i]));
        } else {
            nodes[i]=null;
        }
    }
    for(let i=0; i<arr.length; i++){
        if(arr[i]!=null){
            if(nodes[i*2+1]){
                nodes[i].left=nodes[i*2+1];
            } else {
                nodes[i].left=null;
            }
            if(nodes[i*2+2]){
                nodes[i].right=nodes[i*2+2];
            } else {
                nodes[i].right=null;
            }
        }
    }
    return nodes[0];
}

console.log(isSymmetric(getTreeFromArray([1,2,2,3,4,4,3,5])));