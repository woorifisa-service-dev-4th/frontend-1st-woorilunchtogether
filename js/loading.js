// 로딩 화면 표시 함수
export function showLoadingScreen() {
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

export function hideLoadingScreen() {
    const loadingDiv = document.getElementById("loadingScreen");
    if (loadingDiv) {
      document.body.removeChild(loadingDiv);
    }
}