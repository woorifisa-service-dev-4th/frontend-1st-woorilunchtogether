import { renderKaKaoMap } from "./kakaomap.js";

const foodDataEachTeam = JSON.parse(localStorage.getItem("teamData")) || [];
const modalUpperSideMenu = document.getElementById("menu_idx");
let modalMenuData = document.getElementById("modal_menu_content");

let selectedTeamIndexState = 0;
const MODAL_BG = "#0078B9";

export function modalOn(modalData, selectTeamIndex) {
  const modal = document.querySelector("#modal");
  const modalClose = document.getElementById("close_btn");
  modal.classList.add("on");
  renderModalData(modalData);

  const modalUpperSideMenuTag = modalUpperSideMenu.querySelectorAll("li");
  initalizeModalContentBg(modalUpperSideMenuTag);

  const firstLiTag = document.getElementById("1");
  firstLiTag.style.backgroundColor = MODAL_BG;

  let renderEachFoodInfo = foodDataEachTeam[selectTeamIndex].back[0];
  selectedTeamIndexState = selectTeamIndex;
  
  renderModalEachFoodInfo(renderEachFoodInfo);
  renderKaKaoMap(`${renderEachFoodInfo[1]}`, `${renderEachFoodInfo[0]}`);
  modalClose.addEventListener("click", () => {
    modal.classList.remove("on");
  });
}

function initalizeModalContentBg(liContainer) {
  liContainer.forEach((liTag) => {
    liTag.style.backgroundColor = ""; // 초기화
  });
  modalMenuData.style.backgroundColor = MODAL_BG;
  return;
}

function renderModalEachFoodInfo(eachFoodData) {
  /**
     * 0: "name"
     * 1: "address"
     * 2: "representative_food"
     * 3: "price_per_person"
     */
  modalMenuData.innerHTML = `
  <div id="name" class="text-[26px] font-bold">${eachFoodData[0]}</div>
  <div id="middle_left" class="menu_content_middle flex justify-between">
    <div id="address">
      <div class="text-[#0078B9]">0</div>
      <div id="address_info">${eachFoodData[1]}</div>
    </div>
    <div id="middle_right">
      <span id="price" class="flex justify-center">${eachFoodData[2]}원</span>
      <span id="food" class="flex justify-center pr-3">${eachFoodData[3]}</span>
    </div>
  </div>
  <div id="map" class="flex justify-center w-7 h-7"></div>
  `;
}

function renderModalData(modalData) {
  const teamBox = document.getElementById("result_team");
  const teamIndex = modalData.team;
  const members = modalData.name;
  const updateTeamBox = (members) => {
    teamBox.innerText = members.join(", ");
  };
  updateTeamBox(members);
  teamBox.innerText = teamIndex + " : " + teamBox.innerText;
}

modalUpperSideMenu.addEventListener("click", (event) => {
  const currentModalUpperSideMenu = event.target;

  // 모든 li의 배경 초기화
  const modalUpperSideMenuTag = modalUpperSideMenu.querySelectorAll("li");
  if (currentModalUpperSideMenu.id !== "menu_idx") {
    initalizeModalContentBg(modalUpperSideMenuTag);
    currentModalUpperSideMenu.style.backgroundColor = MODAL_BG;
  }

  let renderEachFoodInfo = foodDataEachTeam[selectedTeamIndexState].back[currentModalUpperSideMenu.id - 1];
  renderModalEachFoodInfo(renderEachFoodInfo);
  renderKaKaoMap(`${renderEachFoodInfo[1]}`, `${renderEachFoodInfo[0]}`);
});

