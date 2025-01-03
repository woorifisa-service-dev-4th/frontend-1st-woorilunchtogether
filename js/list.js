tailwind.config = {
    theme: {
        extend: {
            colors: {
                clifford: '#da373d',
            }
        }
    }
};

const data = JSON.parse(localStorage.getItem('teamData')) || [];

const resultContainer = document.getElementById('result');
if (data.length === 0) {
    resultContainer.innerHTML = `<p>No data available. Please generate teams first.</p>`;
} 

let currentIndex = 0;

function renderCards() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const endIndex = Math.min(currentIndex + 4, data.length);
    for (let i = currentIndex; i < endIndex; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        const namesHtml = data[i].name.map(name => `<div>${name}</div>`).join('');
        card.innerHTML = `
            <div class="card-front">
                <div class="h-1/6">${data[i].team}</div>
                <div class="h-5/6">
                    <div class="h-full w-full outline-none resize-none bg-transparent text-white text-right align-bottom flex flex-col-reverse">${namesHtml}</div>
                </div>
            </div>
            <div class="card-back">
                <div style="font-weight: bold; font-size: 1.2em;">가게명: ${data[i].back[0]}</div><br>
                <div>주소: ${data[i].back[1]}</div><br>
                <div>1인 평균 가격: ${data[i].back[2]}원</div><br>
                <div>주력메뉴: ${data[i].back[3]}</div><br>
            </div>
        `;
        card.addEventListener('click', function () {
            this.classList.toggle('card-back');
        });
        cardContainer.appendChild(card);
    }
}

document.getElementById('prev').addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex -= 4;
        renderCards();
    }
});

document.getElementById('next').addEventListener('click', function () {
    if (currentIndex + 4 < data.length) {
        currentIndex += 4;
        renderCards();
    }
});

renderCards();
