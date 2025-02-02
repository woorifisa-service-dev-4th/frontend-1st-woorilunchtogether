import { renderKaKaoMap } from "./kakaomap.js";

const foodDataEachTeam = JSON.parse(localStorage.getItem("teamData")) || [];
const modalUpperSideMenu = document.getElementById("menu_idx");
let modalMenuData = document.getElementById("modal_menu_content");
const MODAL_BG = "#0078B9";
const MODAL_TEXT = "#ffffff";
let selectedTeamIndexState = 0;
let currentModalEachMenuIndex;
export function modalOn(modalData, selectTeamIndex) {
  currentModalEachMenuIndex = 0;
  const modal = document.querySelector("#modal");
  const modalClose = document.getElementById("close_btn");
  modal.classList.add("on");

  renderModalData(modalData);

  const modalUpperSideMenuTag = modalUpperSideMenu.querySelectorAll("li");
  initalizeModalContentBg(modalUpperSideMenuTag);

  const firstLiTag = document.getElementById("1");
  firstLiTag.style.backgroundColor = MODAL_BG;
  firstLiTag.style.color = MODAL_TEXT;

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
    liTag.style.color = ""; // 초기화
  });
  modalMenuData.style.backgroundColor = MODAL_BG;
  modalMenuData.style.color = MODAL_TEXT;
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
    <div id="middle_right class="flex justify-end">
      <span id="price" class="flex justify-end">${eachFoodData[2]}원</span>
      <span id="food" class="flex justify-end">${eachFoodData[3]}</span>
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
  if(currentModalEachMenuIndex === parseInt(currentModalUpperSideMenu.id - 1)) return;
  currentModalEachMenuIndex = parseInt(currentModalUpperSideMenu.id - 1);

  // 모든 li의 배경 초기화
  const modalUpperSideMenuTag = modalUpperSideMenu.querySelectorAll("li");
  if (currentModalUpperSideMenu.id !== "menu_idx") {
    initalizeModalContentBg(modalUpperSideMenuTag);
    currentModalUpperSideMenu.style.backgroundColor = MODAL_BG;
    currentModalUpperSideMenu.style.color= MODAL_TEXT;
  }

  let renderEachFoodInfo = foodDataEachTeam[selectedTeamIndexState].back[currentModalUpperSideMenu.id - 1];
  renderModalEachFoodInfo(renderEachFoodInfo);
  renderKaKaoMap(`${renderEachFoodInfo[1]}`, `${renderEachFoodInfo[0]}`);
});
