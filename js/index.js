import { getRandomNum, getRandomTeam, getRanNum } from "./getRandomTeam.js";
import { getNamesListPG, SERVICE_CALSS_MEMBERS, CLOUD_ENGINEERING_MEMBERS, AI_MEMBERS } from "./nameList.js";
import {
  name,
  address,
  price_per_person,
  representative_food,
} from "./database.js";
import { getRandomNumArray, makeNumArrayWithout } from "./getRandomNumArray.js";
// Database

let teamResult = [];
let namelistGroup = [];

function team() {
  const whitespaceIsStandard = document.getElementById("splitStandard").checked;
  const classMode = document.getElementById("whatClass");
  const separatorElement = whitespaceIsStandard ? true : false;
  const randomNumberLimit = parseInt(
    document.getElementById("randomNumberLimit").value,
    10
  );
  const useRandomNumbers = document.getElementById("useRandomNumbers").checked;
  const useEachTeamPerson = document.getElementById("useEachTeamPerson").checked ? true : false;
  let teamMemberNumber = 4;
  if (useEachTeamPerson) {
    teamMemberNumber = parseInt(document.getElementById("useEachTeamPersonNum").value, 10);
  }
  if (classMode.options.selectedIndex !== 0) {
    const separator = "x";
    const members = getNamesListPG(namelistGroup);
    teamResult = getRandomTeam({ members, teamMemberNumber, separator });
  } else {
    if (useRandomNumbers && randomNumberLimit) {
      // Generate teams with random numbers
      teamResult = getRandomNum(randomNumberLimit, teamMemberNumber);
    } else if (separatorElement) {
      const members = document.getElementById("members").value.trim();
      // Generate teams with member names
      const separator = " ";
      teamResult = getRandomTeam({ members, teamMemberNumber, separator });
    } else if (!separatorElement) {
      const members = document.getElementById("members").value;
      const separator = ",";
      teamResult = getRandomTeam({ members, teamMemberNumber, separator });
    } else {
      throw new Error(
        "Please provide either a member list or a random number limit."
      );
    }
  }


  if (teamResult.length === 0) {
    return; // Exit if no teams are generated
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
      namelistGroup = SERVICE_CALSS_MEMBERS; // 서비스 클래스 그룹
    } else if (classOption.options.selectedIndex === 2) {
      namelistGroup = CLOUD_ENGINEERING_MEMBERS; // 클라우드 엔지니어링 그룹
    } else if (classOption.options.selectedIndex === 3) {
      namelistGroup = AI_MEMBERS; // AI 그룹
    }

    // 자리 배치를 렌더링 (화면에 표시)
    renderSeatArrangement(seatArrangement, namelistGroup);
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
  createNameComponent(namelistGroup);
}

document.getElementById("splitStandard").addEventListener("click", () => {
  const seatArrangement = document.getElementById("seatArrangement");
  if (!seatArrangement.classList.contains("hidden")) {
    seatArrangement.classList.toggle('hidden');
  }
  team();
});

document.getElementById("splitComma").addEventListener("click", () => {
  const seatArrangement = document.getElementById("seatArrangement");
  if (!seatArrangement.classList.contains("hidden")) {
    seatArrangement.classList.toggle('hidden');
  }
  team();
});

document.getElementById("generateBtn").addEventListener("click", () => {
  if (!teamResult || teamResult.length === 0) {
    team();
  }
  showLoadingScreen();

  setTimeout(() => {
    const data = teamResult.map((team) => {
      const randomIndexArray = getRandomNumArray(4, makeNumArrayWithout(name.length, []));
      return {
        team: team.teamName,
        name: team.members.map((member) => member.name),
        back: randomIndexArray.map((idx) => {
          return Array(name[idx], address[idx], price_per_person[idx], representative_food[idx])
        })
      };
    });

    localStorage.setItem("teamData", JSON.stringify(data));
    hideLoadingScreen();
    window.location.href = "list.html";
  }, 1000);
});






// 로딩 화면 표시 함수
function showLoadingScreen() {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loadingScreen";
  loadingDiv.style.position = "fixed";
  loadingDiv.style.top = "0";
  loadingDiv.style.left = "0";
  loadingDiv.style.width = "100%";
  loadingDiv.style.height = "100%";
  loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  loadingDiv.style.display = "flex";
  loadingDiv.style.flexDirection = "column";
  loadingDiv.style.justifyContent = "center";
  loadingDiv.style.alignItems = "center";
  loadingDiv.style.zIndex = "9999";

  const loadingImage = document.createElement("img");
  loadingImage.src = "./src/asset/component.png";
  loadingImage.alt = "로딩 중";
  loadingImage.style.width = "150px";
  loadingImage.style.marginBottom = "20px";

  loadingDiv.appendChild(loadingImage);

  document.body.appendChild(loadingDiv);
}
function hideLoadingScreen() {
  const loadingDiv = document.getElementById("loadingScreen");
  if (loadingDiv) {
    document.body.removeChild(loadingDiv);
  }
}