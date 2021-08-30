class TreeNode {
    constructor(val = 0, left = null, right = null){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function binaryTree( preStr ,  midStr ) {
    const midStrMap = new Map();
    for(const i in midStr) {
        midStrMap.set(midStr.charAt(i), Number(i)); // val => index
    }
    let root = buildBinaryTree(preStr, midStr, midStrMap, 0, preStr.length, 0, midStr.length);
    let res = [];
    getPostOrder(root, res);
    return res.join('');
}

function buildBinaryTree( preStr, midStr, map, preStart, preEnd, midStart, midEnd) {
    if( preEnd === preStart){
        return null;
    }
    const root = new TreeNode(preStr.charAt(preStart));
    const rootInMidStr = map.get(root.val);
    const leftNum = rootInMidStr - midStart;
    root.left = buildBinaryTree(preStr, midStr, map, preStart+1, preStart+1+leftNum, midStart, rootInMidStr);
    root.right = buildBinaryTree(preStr, midStr, map, preStart+1+leftNum, preEnd, rootInMidStr + 1, midEnd);
    return root;
}

function getPostOrder( node, res ) {
    if(node===null){
        return;
    }
    getPostOrder(node.left, res);
    getPostOrder(node.right, res);
    res.push(node.val);
}

console.log(binaryTree("GDAFEMHZ","ADEFGHMZ"));