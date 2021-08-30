function lastDigitQuickPow(str1, str2) {
    let x = mod10(str1);
    let n = parseInt(str2);
    if (n === 0) {
        return 1;
    }
    let res = 1;
    for (let i = x; n; i = mod10(i * i), n = n >> 1) {
        if ((n & 1) == 1) {
            res = mod10(res * i);
        }
    }
    return res;
}

function lastDigit(str1, str2) {
    let x = mod10(str1);
    let n = parseInt(str2);
    if (n === 0) {
        return 1;
    }
    let loopCount = 0;
    let loopNum = [x];
    for (let i = x; true;) {
        i = mod10(i * x);
        loopCount++;
        if (i === x) {
            break;
        } else {
            loopNum.push(i);
        }
    }
    let resMod = (n - 1) % loopCount;
    return loopNum[resMod];
}

function mod10(num) {
    return parseInt(num) % 10;
}

console.log(lastDigit("2", "1145141919"))
console.log(lastDigitQuickPow("2", "1145141919"))