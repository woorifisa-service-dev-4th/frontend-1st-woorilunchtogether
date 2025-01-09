import { getRandomNum, getRandomTeam, getRanNum } from "./getRandomTeam.js";
import { getNamesList, namelistGroup } from "./nameList.js";
import {
  name,
  address,
  price_per_person,
  representative_food,
} from "./database.js";
// Database

let teamResult = [];

function team() {
  const whitespaceIsStandard = document.getElementById("splitStandard").checked;
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

  if (teamResult.length === 0) {
    return; // Exit if no teams are generated
  }
}


document.getElementById("nameListBtn").addEventListener("click", () => {
  const seatArrangement = document.getElementById("seatArrangement");
  seatArrangement.classList.toggle("hidden");


  // 자리배치도 렌더링
  if (!seatArrangement.classList.contains("hidden")) {
    renderSeatArrangement(seatArrangement, namelistGroup);
  }
});

function renderSeatArrangement(container) {
  // 컨테이너 가져오기
  const Container = document.getElementById("GroupContainer");


  // 각각 초기화
  Container.innerHTML = "";

  const createNameComponent = (group) => {
    group.forEach((member) => {
      // 이름 컴포넌트 생성
      const nameElement = document.createElement("div");
      nameElement.className = `
      name-component ${member.excluded ? "" : "active"}
      flex items-center justify-between
      px-2 py-1
      bg-gray-100 text-gray-700
      rounded-lg shadow border border-gray-300
      text-sm hover:bg-gray-200
      w-[100%]
      h-[45px]
    `;
      nameElement.innerHTML = `
        <span>${member.name}</span>
        <span class="text-blue-300 font-bold cursor-pointer hover:text-blue-300">×</span>
      `;

      nameElement.addEventListener("click", () => {
        member.excluded = !member.excluded; // 제외 상태 토글
        nameElement.classList.toggle("active", !member.excluded); // 클래스 업데이트


        // 색상 변경 로직
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

      Container.appendChild(nameElement);
    });
  };

  // 그룹 렌더링
  createNameComponent(namelistGroup);
}

document.getElementById("splitStandard").addEventListener("click", () => {
  team();
});

document.getElementById("splitComma").addEventListener("click", () => {
  team();
});

document.getElementById("generateBtn").addEventListener("click", () => {
  if (!teamResult || teamResult.length === 0) {
    team();
  }
  showLoadingScreen();

  setTimeout(() => {
    const filteredNames = getNamesList(); // 자리배치도에서 제외되지 않은 이름 가져오기
    console.log(filteredNames);
    let teamData;


    if (filteredNames && filteredNames.length > 0) {
      // 자리배치도 데이터를 사용해 랜덤 팀 생성
      const teamMemberNumber = 4; // 팀당 최대 인원
      const separator = " "; // 구분자
      teamData = getRandomTeam({
        members: filteredNames.join(separator),
        teamMemberNumber,
        separator,
      });
    } else {
      // 기존 사용자가 입력한 데이터를 기반으로 랜덤 팀 생성
      const members = document.getElementById("members").value.trim();
      const separator = document.getElementById("splitStandard").checked ? " " : ",";
      const teamMemberNumber = 4; // 팀당 최대 인원
      teamData = getRandomTeam({
        members,
        teamMemberNumber,
        separator,
      });
    }

    // 결과 데이터 생성 및 저장
    if (teamData && teamData.length > 0) {
      const data = teamData.map((team) => {
        const randomIndex = getRanNum(name.length);
        return {
          team: team.teamName,
          name: team.members.map((member) => member.name),
          back: [
            name[randomIndex],
            address[randomIndex],
            price_per_person[randomIndex],
            representative_food[randomIndex],
          ],
        };
      });

      localStorage.setItem("teamData", JSON.stringify(data));
      hideLoadingScreen();
      window.location.href = "list.html";
    } else {
      hideLoadingScreen();
      alert("팀 생성 failed");
    }
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