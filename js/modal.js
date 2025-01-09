import {
  name,
  address,
  price_per_person,
  representative_food,
} from "./database.js";

const dataTo = makeDataToObject();
let renderedFoodInfolist = {};
const ff = document.getElementById("menu_idx");
let menuIndo = document.getElementById("modal_menu_content");
ff.addEventListener("click", (event) => {
  const clickedLi = event.target;
  console.log(clickedLi);

  // 모든 li의 배경 초기화
  const allLi = ff.querySelectorAll("li");
  if (clickedLi.id !== "menu_idx") {
    allLi.forEach((li) => {
      li.style.backgroundColor = ""; // 초기화
    });
    clickedLi.style.backgroundColor = "#0078B9";
  }

  menuIndo = document.getElementById("modal_menu_content");
  menuIndo.style.backgroundColor = "#0078B9";
  let renderedFoodInfo = renderedFoodInfolist[clickedLi.id - 1];
  menuIndo.innerHTML = `
            <div id="name" class="text-2xl">${renderedFoodInfo.name}</div>
            <div id="middle_left" class="menu_content_middle flex justify-between">
              <div>${renderedFoodInfo.address}</div>
              <div id="middle_right">
                <span id="food" class="flex justify-center">${renderedFoodInfo.representative_food}</span>
                <span id="price" class="flex justify-center">${renderedFoodInfo.price_per_person}</span>
              </div>
            </div>
             <div id="map" class="flex justify-center w-7 h-7"></div>
  `;
  renderKaKaoMap();
});

console.log(dataTo);
console.log(renderedFoodInfolist);
function makeDataToObject() {
  const dataTo = {};
  for (let i = 0; i < name.length; i++) {
    dataTo[i] = {
      name: name[i],
      address: address[i],
      price_per_person: price_per_person[i],
      representative_food: representative_food[i],
    };
  }
  return dataTo;
}

export function modalOn(names) {
  const modal = document.querySelector("#modal");
  const modalClose = document.getElementById("close_btn");
  modal.classList.add("on");
  renderTeamTilte(names);
  makeDataToObject();
  renderedFoodInfolist = pick4food();
  //menuIndo 초기화화
  const allLi = ff.querySelectorAll("li");
  allLi.forEach((li) => {
    li.style.backgroundColor = ""; // 초기화
  });
  const lili = document.getElementById("1");
  lili.style.backgroundColor = "#0078B9";
  menuIndo.style.backgroundColor = "#0078B9";
  let renderedFoodInfo = renderedFoodInfolist[0];
  menuIndo.innerHTML = `
            <div id="name" class="text-2xl">${renderedFoodInfo.name}</div>
            <div id="middle_left" class="menu_content_middle flex justify-between">
              <div>${renderedFoodInfo.address}</div>
              <div id="middle_right">
                <span id="food" class="flex justify-center">${renderedFoodInfo.representative_food}</span>
                <span id="price" class="flex justify-center">${renderedFoodInfo.price_per_person}</span>
              </div>
            </div>
                <div id="map" class="flex justify-center w-7 h-7"></div>
 
  `;
  renderKaKaoMap();
  modalClose.addEventListener("click", () => {
    modal.classList.remove("on");
  });
  console.log(names);
  console.log(renderedFoodInfolist);
}

function renderTeamTilte(names) {
  const teamBox = document.getElementById("result_team");
  const teamIndex = names.team;
  const members = names.name;
  console.log(teamIndex);
  console.log(members);
  const updateTeamBox = (members) => {
    teamBox.innerText = members.join(", ");
  };
  updateTeamBox(members);
  teamBox.innerText = teamIndex + " : " + teamBox.innerText;
}

function pick4food() {
  const renderedFoodInfolist = {};
  /*
  알고리즘
  */
  for (let i = 0; i < 4; i++) {
    const ind = Math.floor(Math.random() * 35);
    renderedFoodInfolist[i] = dataTo[ind];
  }
  return renderedFoodInfolist;
}

function renderFoodDescription() {}
export function renderKaKaoMap() {
  const a = 33.450701;
  const b = 126.570667;
  const mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(a, b), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
  // 마커가 지도 위에 표시되도록 설정합니다
  const map = new kakao.maps.Map(mapContainer, mapOption);
}
