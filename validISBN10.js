function validISBN10( isbn ) {
    if(isbn.length!=10){
        return false;
    }
    let digits = isbn.split('');
    let sum = 0;
    // 先提取第10位
    let last = digits.pop();
    if(last=='X'){
        sum+=10*10;
    } else {
        sum+=parseInt(last)*10;
    }
    for(const i in digits){
        const digit = parseInt(digits[i]);
        if(isNaN(digit)){
            return false;
        }
        sum+=digit*(parseInt(i)+1);
    }
    return sum%11===0;
}

console.log(validISBN10("1112223339"));