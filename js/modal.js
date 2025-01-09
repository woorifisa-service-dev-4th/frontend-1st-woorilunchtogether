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
    clickedLi.style.backgroundColor = "lightblue";
  }

  menuIndo = document.getElementById("modal_menu_content");
  menuIndo.style.backgroundColor = "lightblue";
  let renderedFoodInfo = renderedFoodInfolist[clickedLi.id - 1];
  menuIndo.innerHTML = `
            <div id="name">${renderedFoodInfo.name}</div>
            <div id="middle_left" class="menu_content_middle flex justify-between">
              <div>${renderedFoodInfo.address}</div>
              <div id="middle_right">
                <span id="food" class="flex justify-center">${renderedFoodInfo.representative_food}</span>
                <span id="price" class="flex justify-center">${renderedFoodInfo.price_per_person}</span>
              </div>
            </div>
             <div id="map" class="flex justify-center w-7 h-7"></div>
  `;
  renderKaKaoMap(`${renderedFoodInfo.address}`, `${renderedFoodInfo.name}`);
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
  lili.style.backgroundColor = "lightblue";
  menuIndo.style.backgroundColor = "lightblue";
  let renderedFoodInfo = renderedFoodInfolist[0];
  menuIndo.innerHTML = `
            <div id="name">${renderedFoodInfo.name}</div>
            <div id="middle_left" class="menu_content_middle flex justify-between">
              <div>${renderedFoodInfo.address}</div>
              <div id="middle_right">
                <span id="food" class="flex justify-center">${renderedFoodInfo.representative_food}</span>
                <span id="price" class="flex justify-center">${renderedFoodInfo.price_per_person}</span>
              </div>
            </div>
                <div id="map" class="flex justify-center w-7 h-7"></div>
 
  `;
  renderKaKaoMap(`${renderedFoodInfo.address}`, `${renderedFoodInfo.name}`);
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
let mapState;
// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();
      for (let i=0; i<data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      mapState.setBounds(bounds);
  }
}

function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
      map: mapState,
      position: new kakao.maps.LatLng(place.y, place.x)
  });
  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(mapState, marker);
  });
}

export function renderKaKaoMap(address, mapName) {
  const a = 33.450701;
  const b = 126.570667;
  const mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(a, b), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
  // 마커가 지도 위에 표시되도록 설정합니다
  mapState = new kakao.maps.Map(mapContainer, mapOption);
  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  const infowindow = new kakao.maps.InfoWindow({zIndex:1});
  // 장소 검색 객체를 생성합니다
  // const ps = new kakao.maps.services.Places();
  // 키워드로 장소를 검색합니다
  // ps.keywordSearch(address, placesSearchCB);  

  var geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
          map: mapState,
          position: coords
      });
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${mapName}</div>`
      });
      infowindow.open(mapState, marker);
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      mapState.setCenter(coords);
    }
  });  
}
