import { getRanNum } from "./getRandomTeam.js";

const getRandomNumArray = function (setSize, numArr) {
    const randomSet = new Set();
    const numArrSize = numArr.length;
    if (setSize > numArrSize){
        console.log('getRandomNumSet: 뽑으려는 숫자가 후보보다 많습니다!');
        return numArr;
    }
    while(randomSet.size < setSize) {
        const numToAdd = numArr[getRanNum(numArrSize)];
        randomSet.add(numToAdd);
        if (randomSet.size === setSize) return Araay.from(randomSet);
    }
}

const makeNumArrWithout = function (maxNum, arrExclude) {
    const arr = [];
    for(let i = 0; i < maxNum; i++){
        if(arrExclude.indexOf(i) === -1){
            arr[arr.length] = i;
        }
    }
    
    return arr;
}

const test = (numArr) => {
    let attempt = 10000;
    console.log(numArr);
    
    const testArr = Array.from({length: numArr.length}, () => 0);
    while(attempt--){
        const set = getRandomNumSet(7, numArr);
        set.forEach((num)=> testArr[num]++);
    }
    testArr.forEach((val, idx) => {
        console.log(`${idx}: ${val}`);
        
    })
    
}

export { getRandomNumArray, makeNumArrWithout };