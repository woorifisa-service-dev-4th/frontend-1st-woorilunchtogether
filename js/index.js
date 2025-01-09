import { getIndexArray } from "./accel/array.js";
import { getRandomIndexArray, getRandomNumberTeam, getRandomTeam } from "./accel/random.js";
import { name, address, price_per_person, representative_food, } from "./database.js";
import { showLoadingScreen, hideLoadingScreen } from "./loading.js";
import { getNamesList, getNamesListPG, SERVICE_CALSS_MEMBERS } from "./nameList.js";

// Database

let analyzedData = [];
let nameData = [];

function splitDataNCreateTeam() {
  const IsStandardWhitespace = document.getElementById("splitStandard").checked;
  const useRandomNumbers = document.getElementById("useRandomNumbers").checked;
  const useEachTeamPerson = document.getElementById("useEachTeamPerson").checked ? true : false;
  const classMode = document.getElementById("whatClass");
  const separatorElement = IsStandardWhitespace ? true : false;
  const randomNumberLimit = parseInt(document.getElementById("randomNumberLimit").value, 10);
  
  let teamMemberNumber = 4;
  if (useEachTeamPerson) teamMemberNumber = parseInt(document.getElementById("useEachTeamPersonNum").value, 10);
  
  // 우리FISA 수업 반에서 사용시 선택되는 옵션
  if (classMode.options.selectedIndex !== 0) {
    const separator = "x";
    const members = getNamesListPG(nameData);
    analyzedData = getRandomTeam({ members, teamMemberNumber, separator });
  } else {
    // 일반적으로 식사 멤버를 구성할 때 선택되는 옵션

    // 입력과 상관 없이, 랜덤 숫자를 이용하여 식사 멤버를 구성하고 메뉴 추천을 받는 Case
    if (useRandomNumbers && randomNumberLimit) {
      // Generate teams with random numbers
      analyzedData = getRandomNumberTeam(randomNumberLimit, teamMemberNumber);
    } else {
      try {
        // 입력된 멤버 리스트를 공백 구분자를 이용하여 팀을 구성하는 Case
        if (separatorElement) {
          const separator = " ";
          const members = document.getElementById("members").value.trim();
          // Generate teams with member names
          analyzedData = getRandomTeam({ members, teamMemberNumber, separator });
        } else {
          // 입력된 멤버 리스트를 쉼표 구분자를 이용하여 팀을 구성하는 Case
          const separator = ",";
          const members = document.getElementById("members").value;
          analyzedData = getRandomTeam({ members, teamMemberNumber, separator });
        }
      } catch {
        throw new Error("Please provide either a member list or a random number limit.");
      }
    } 
  }

  if (analyzedData.length === 0) {
    throw new Error("알 수 없는 에러가 발생함. index.js: 55");
  }
}
// ID가 "whatClass"인 드롭다운 메뉴의 값이 변경되었을 때 실행되는 이벤트 리스너
document.getElementById("whatClass").addEventListener("change", () => {
  // "whatClass" 드롭다운 메뉴 요소를 가져옴
  const classOption = document.getElementById("whatClass");
  // 자리 배치 관련 요소를 가져옴
  const seatArrangement = document.getElementById("seatArrangement");

  // 드롭다운에서 선택된 값이 첫 번째 옵션(기본값)일 경우
  if (classOption.options.selectedIndex === 0) {
    // "seatArrangement" 요소의 숨김 상태를 토글 (보이거나 숨기기)
    seatArrangement.classList.toggle('hidden');
  } else {
    // "seatArrangement"가 숨겨져 있는 경우 보이도록 설정
    if (seatArrangement.classList.contains("hidden")) {
      seatArrangement.classList.toggle('hidden');
    }

    // 선택된 드롭다운 메뉴의 값에 따라 그룹 데이터를 설정
    if (classOption.options.selectedIndex === 1) {
      nameData = SERVICE_CALSS_MEMBERS; // 서비스 클래스 그룹
    } else if (classOption.options.selectedIndex === 2) {
      nameData = CLOUD_ENGINEERING_MEMBERS; // 클라우드 엔지니어링 그룹
    } else if (classOption.options.selectedIndex === 3) {
      nameData = AI_MEMBERS; // AI 그룹
    }

    // 자리 배치를 렌더링 (화면에 표시)
    renderSeatArrangement(seatArrangement, nameData);
  }
});

// 자리 배치를 화면에 표시하는 함수
function renderSeatArrangement(container) {
  // 자리 배치를 표시할 컨테이너 요소 가져오기
  const Container = document.getElementById("GroupContainer");

  // 컨테이너의 내용을 초기화 (기존 내용 제거)
  Container.innerHTML = "";

  // 그룹 내 멤버들을 기반으로 UI 컴포넌트를 생성
  const createNameComponent = (group) => {
    group.forEach((member) => {
      // 이름 표시 컴포넌트 생성
      const nameElement = document.createElement("label");
      nameElement.className = `
        name-component ${member.excluded ? "" : "active"}
        flex items-center justify-between
        px-2 py-1
        bg-gray-100 text-gray-700
        rounded-lg shadow border border-gray-300
        text-sm hover:bg-gray-200
        cursor-pointer
        w-[100%]
        h-[45px]
      `;
      nameElement.innerHTML = `
        <span>${member.name}</span>
        <span class="text-blue-300 font-bold hover:text-blue-300">×</span>
      `;

      // 멤버를 클릭했을 때 제외 상태를 토글하는 이벤트 리스너
      nameElement.addEventListener("click", () => {
        member.excluded = !member.excluded; // 제외 상태를 반전

        // 제외 상태에 따라 색상과 스타일 변경
        if (member.excluded) {
          nameElement.classList.remove("bg-gray-100", "text-gray-700");
          nameElement.classList.add("bg-gray-300", "text-gray-400");
          nameElement.querySelector("span:last-child").classList.add("text-red-500");
        } else {
          nameElement.classList.remove("bg-gray-300", "text-gray-400");
          nameElement.classList.add("bg-gray-100", "text-gray-700");
          nameElement.querySelector("span:last-child").classList.remove("text-red-500");
        }
      });

      // 컨테이너에 생성된 요소 추가
      Container.appendChild(nameElement);
    });
  };

  // 그룹 데이터를 기반으로 자리 배치를 화면에 표시
  createNameComponent(nameData);
}

document.getElementById("splitStandard").addEventListener("click", () => {
  const seatArrangement = document.getElementById("seatArrangement");
  if (!seatArrangement.classList.contains("hidden")) {
    seatArrangement.classList.toggle('hidden');
  }
  splitDataNCreateTeam();
});

document.getElementById("splitComma").addEventListener("click", () => {
  const seatArrangement = document.getElementById("seatArrangement");
  if (!seatArrangement.classList.contains("hidden")) {
    seatArrangement.classList.toggle('hidden');
  }
  splitDataNCreateTeam();
});

document.getElementById("generateBtn").addEventListener("click", () => {
  if (!analyzedData || analyzedData.length === 0) {
    splitDataNCreateTeam();
  }
  showLoadingScreen();

  setTimeout(() => {
    const data = analyzedData.map((team) => {
      const chooseFourRandomStore = getRandomIndexArray(4, getIndexArray(name.length));
      return {
        team: team.teamName,
        name: team.members.map((member) => member.name),
        back: chooseFourRandomStore.map((idx) => {
          return Array(name[idx], address[idx], price_per_person[idx], representative_food[idx])
        })
      };
    });

    localStorage.setItem("teamData", JSON.stringify(data));
    hideLoadingScreen();
    window.location.href = "list.html";
  }, 1000);
});




