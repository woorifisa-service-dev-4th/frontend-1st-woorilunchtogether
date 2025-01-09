// map 객체
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
  const a = 37.581562;
  const b = 126.886046;
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
  const ps = new kakao.maps.services.Places();
  // 키워드로 장소를 검색합니다
  // 

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
          content: `<div style="width:200px; color:black;text-align:center;padding:6px 0;">${mapName}</div>`
      });
      infowindow.open(mapState, marker);
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      mapState.setCenter(coords);
    } else {
      ps.keywordSearch(mapName, placesSearchCB);  
    }
  });  
}
