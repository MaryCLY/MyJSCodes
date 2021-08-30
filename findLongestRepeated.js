const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
var N;
var nums;
rl.on('line', (input)=>{
    if(N===undefined){
        N = parseInt(input);
    } else {
        nums = input.split(' ').map((v)=>parseInt(v, 10)); //转为数值数组
        let cur = 0;
        let maxCount = 0;
        let maxNum;
        while(cur<N){
            // 每循环一次寻找一个新区间
            let count = 0, num = nums[cur];
            if(cur>1 && nums[cur-2]===num){
                // 使用交换资格增加一次
                count++;
            } else if (cur<N-2 && nums[cur+2]===num){
                count++;
            }
            while(nums[cur]===num){
                cur++;
                count++;
            }
            if(count>maxCount){
                maxCount = count;
                maxNum = num;
            }
        }
        console.log(maxCount);
        rl.close();
        rl.removeAllListeners();
    }
})