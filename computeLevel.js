const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
var scores;
var myScore;
function computeLevel(order){
    order = order+1;
    if(order<6){
        console.log("A+");
    } else if (order<16){
        console.log("A0");
    } else if (order<31){
        console.log("B+");
    } else if (order<36){
        console.log("B0");
    } else if (order<46){
        console.log("C+");
    } else if (order<49){
        console.log("C0");
    } else {
        console.log("F");
    }
}
rl.on('line', (input)=>{
    if(scores===undefined){
        scores = input.split(' '); // str array
    } else {
        myScore = parseInt(input);
        // 二分查找
        let start = 0, end = scores.length;
        while(start<end-1){
            let center = start + Math.floor((end-start)/2);
            let centerScore = parseInt(scores[center]);
            if(myScore===centerScore){
                start = center; end = center + 1;
                break;
            } else if (myScore>centerScore){
                end = center;
            } else {
                start = center+1;
            }
        }
        computeLevel(start);
        rl.close();
        rl.removeAllListeners();
    }
})