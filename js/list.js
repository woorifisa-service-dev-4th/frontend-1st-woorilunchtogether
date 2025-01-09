import { modalOn } from "./modal.js";

tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
      },
    },
  },
};

const data = JSON.parse(localStorage.getItem("teamData")) || [];
const resultContainer = document.getElementById("result");
if (data.length === 0) {
  resultContainer.innerHTML = `<p>No data available. Please generate teams first.</p>`;
}

let currentTeamIndex = 0;
function renderCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const endIndex = Math.min(currentTeamIndex + 4, data.length);
  for (let i = currentTeamIndex; i < endIndex; i++) {
    const card = document.createElement("div");
    card.className = "card modal-off";

    const namesHtml = data[i].name.map((name) => `<div>${name}</div>`).join("");
    card.innerHTML = `
            <div class="card-front modal-off">
                <div class="h-1/6">${data[i].team}</div>
                <div class="h-5/6">
                    <div class="h-full w-full outline-none resize-none bg-transparent text-white text-right align-bottom flex flex-col-reverse">${namesHtml}</div>
                </div>
            </div>
        `;
    const modalContent = data[i];
    card.addEventListener("click", function () {
      modalOn(modalContent, i);
    });

    cardContainer.appendChild(card);
  }
}

document.getElementById("prev").addEventListener("click", function () {
  if (currentTeamIndex > 0) {
    currentTeamIndex -= 4;
    renderCards();
  }
});

document.getElementById("next").addEventListener("click", function () {
  if (currentTeamIndex + 4 < data.length) {
    currentTeamIndex += 4;
    renderCards();
  }
});

renderCards();
