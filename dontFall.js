const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
var T;
var p=1;
rl.on('line', (input)=>{
    if(T===undefined){
        T=parseInt(input);
    } else {
        T--;
        let inputs = input.split(' ').map((v)=>parseInt(v, 10));
        const x = inputs[0], st = inputs[1];
        const ways = [0, 0]; // 0: 不掉下悬崖, 1: 掉下悬崖
        go(x, st, ways);
        p = p*(ways[0]/(ways[0]+ways[1]));
    }
    if(T===0){
        console.log(parseFloat(p.toString));
        rl.close();
        rl.removeAllListeners();
    }
})

function go(x, st, ways){
    if(x<0 || x>60){
        ways[1]++;
        return;
    } else if (st===0){
        ways[0]++;
        return;
    }
    go(x-1, st-1, ways);
    go(x+1, st-1, ways);
}

