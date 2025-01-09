// 각 그룹의 멤버 배열
export const SERVICE_CALSS_MEMBERS = createNameList([
  "윤영찬", "권민지", "권지윤", "김새봄", "김성엽", "김성준", "김소민", "김승호", "김윤권", "김지연",
  "남승현", "노영재", "마서영", "박찬진", "배승혁", "서용준", "서채연", "신희원", "여은동", "유승한",
  "윤선영", "윤예진", "윤태경", "이서연", "이소연", "이승준", "이원빈", "이정민", "이한비", "이현경",
  "임지섭", "조윤주", "조현식", "차승훈", "허연규", "황유환", "황혜영", "구본훈"
]);


export const CLOUD_ENGINEERING_MEMBERS = createNameList([
  "박준형", "김민정", "이수민", "장현우", "최은영", "한지호", "강소라", "신동엽", "오현석", "이재영",
  "문서영", "황석현", "이상민", "배지훈", "조민수", "차유나", "고은비", "김도윤", "박혜진", "윤태훈",
  "정다연", "이한솔", "송지훈", "권나윤", "장동민", "김시현", "노정훈", "오지현", "백승환", "전민아"
]);

export const AI_MEMBERS = createNameList([
  "김수현", "박서연", "이현준", "최하은", "한준혁", "정민지", "신유진", "문지호", "오준수", "강민경",
  "최정훈", "이유진", "김태환", "배민지", "조영우", "황보라", "고재훈", "서유나", "임태현", "박은지",
  "정하윤", "김정훈", "이민지", "박현우", "유다영", "장성민", "차예린", "윤지훈", "문채연", "오승준"
]);

// 이름 목록에서 excluded: false를 자동 추가하는 함수
function createNameList(names) {
  return names.map((name) => ({
    name,
    excluded: false,
  }));
}



// 이름 가나다 순 정렬하는 함수
function sortNameList(group) {
  group.sort((a, b) => a.name.localeCompare(b.name));
}

sortNameList(SERVICE_CALSS_MEMBERS);
sortNameList(SERVICE_CALSS_MEMBERS);
sortNameList(SERVICE_CALSS_MEMBERS);


export function getNamesListPG(group) {
  const includedGroup = group.filter((m) => !m.excluded).map((m) => m.name);

  // 그룹 결과 반환
  return [...includedGroup];
}

