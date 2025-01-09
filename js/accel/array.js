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

// 이름 가나다 순 정렬하는 함수
export function sortNameList(group) {
    group.sort((a, b) => a.name.localeCompare(b.name));
}
  
export function getNamesList(group) {
    const includedGroup = group.filter((m) => !m.excluded).map((m) => m.name);
  
    // 그룹 결과 반환
    return [...includedGroup];
}
  