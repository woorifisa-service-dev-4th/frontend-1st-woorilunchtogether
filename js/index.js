import { getRandomNum, getRandomTeam, getRanNum } from "/js/getRandomTeam.js";
import {
  name,
  address,
  price_per_person,
  representative_food,
} from "/js/database.js";
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
  const teamMemberNumber = 4;

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
    const data = teamResult.map((team) => {
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
  loadingImage.src = "/src/asset/component.png";
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
