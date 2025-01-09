export const SERVICE_CALSS_MEMBERS = [
    { name: "윤영찬", excluded: false },
    { name: "권민지", excluded: false },
    { name: "권지윤", excluded: false },
    { name: "김새봄", excluded: false },
    { name: "김성엽", excluded: false },
    { name: "김성준", excluded: false },
    { name: "김소민", excluded: false },
    { name: "김승호", excluded: false },
    { name: "김윤권", excluded: false },
    { name: "김지연", excluded: false },
    { name: "남승현", excluded: false },
    { name: "노영재", excluded: false },
    { name: "마서영", excluded: false },
    { name: "박찬진", excluded: false },
    { name: "배승혁", excluded: false },
    { name: "서용준", excluded: false },
    { name: "서채연", excluded: false },
    { name: "신희원", excluded: false },
    { name: "여은동", excluded: false },
    { name: "유승한", excluded: false },
    { name: "윤선영", excluded: false },
    { name: "윤예진", excluded: false },
    { name: "윤태경", excluded: false },
    { name: "이서연", excluded: false },
    { name: "이소연", excluded: false },
    { name: "이승준", excluded: false },
    { name: "이원빈", excluded: false },
    { name: "이정민", excluded: false },
    { name: "이한비", excluded: false },
    { name: "이현경", excluded: false },
    { name: "임지섭", excluded: false },
    { name: "조윤주", excluded: false },
    { name: "조현식", excluded: false },
    { name: "차승훈", excluded: false },
    { name: "허연규", excluded: false },
    { name: "황유환", excluded: false },
    { name: "황혜영", excluded: false },
    { name: "구본훈", excluded: false },
];


// 이름 가나다 순 정렬하는 함수
function sortNameList(group) {
  group.sort((a, b) => a.name.localeCompare(b.name));
  } 

  sortNameList(SERVICE_CALSS_MEMBERS);   

// 제외되지 않은 이름만 반환하는 함수
export function getNamesList() {
    const includedGroup = SERVICE_CALSS_MEMBERS.filter((m) => !m.excluded).map((m) => m.name);
  
    // 그룹 결과 반환
    return [...includedGroup];
  }
export function getNamesListPG(group) {
    const includedGroup = group.filter((m) => !m.excluded).map((m) => m.name);
  
    // 그룹 결과 반환
    return [...includedGroup];
  }

