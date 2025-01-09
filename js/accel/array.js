export const splitter = (str, separator) => {
    let memberList = [];
    if(separator === ' ') {
        memberList = str.split(/\s+/);
    } else {
        memberList = str.split(separator);
    }
    return memberList;
}

export const getIndexArray = function (maxNum) {
    const arr = [];
    for(let i = 0; i < maxNum; i++){
        arr[arr.length] = i;
    }
    return arr;
}

export const getIndexArrayWithout = function (maxNum, arrExclude) {
    const arr = [];
    for(let i = 0; i < maxNum; i++){
        if(arrExclude.indexOf(i) === -1){
            arr[arr.length] = i;
        }
    }
    return arr;
}