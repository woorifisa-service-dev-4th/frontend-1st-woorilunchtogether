import { getRandomNum, getRandomTeam } from './getRandomTeam.js';

// Database
const address = ['서울 마포구 월드컵북로 434 상암IT센터 1층 116호', '서울 마포구 월드컵북로58길 10 더팬빌딩 2층', '서울 마포구 월드컵북로56길 9 우리기술사옥 2층','서울 마포구 월드컵북로56길 19 드림타워 2층','서울 마포구 월드컵북로54길 25 B1층 B109호','서울 마포구 월드컵북로54길 25 상암DMC푸르지오시티 지하1층 B107호','서울 마포구 월드컵북로54길 25 지하1층 B108호', '서울특별시 마포구 월드컵북로54길 25', '서울특별시 마포구 월드컵북로54길 17 109호', '서울특별시 마포구 상암동 257', '서울특별시 마포구 월드컵북로56길 19', '서울특별시 마포구 상암동 1597', '서울특별시 마포구 월드컵북로54길 25', '서울특별시 마포구 월드컵북로54길 25 푸르지오시티 218호', '서울 마포구 월드컵북로54길 17 사보이시티 B동 지하1층 B126호', '서울 마포구 월드컵북로54길 17 사보이시티 지하 1층 B-132A 도락', '서울 마포구 월드컵북로54길 17 지하1층 124호 경양식당','서울 마포구 월드컵북로54길 17 사보이시티 DMC 지하 1층', '서울 마포구 월드컵북로54길 17 사보이시티 DMC 지하1층 125호', '서울 마포구 월드컵북로54길 17 1층 110호 장정정', '서울 마포구 월드컵북로54길 17 사보이시티디엠씨 지하1층 b116호 달리181', '서울 마포구 월드컵북로54길 17 사보이시티 B동 2층 206,210호', '서울 마포구 월드컵북로54길 25 상암DMC푸르지오시티 지하1층 B104호, 105호', '서울 마포구 월드컵북로 402 케이지아이티센터2층', '서울 마포구 월드컵북로 400 서울경제진흥원 지하1층', '서울 마포구 월드컵북로 400 한국영상자료원 1층 A111호', '서울 마포구 월드컵북로 396 누리꿈스퀘어 공동제작센터 2층', '서울 마포구 월드컵북로 381', '서울 마포구 성암로 267 MBC몰파크 지하1층 B117호', '서울 마포구 성암로 267 지하1층 비110호', '서울 마포구 상암산로 76 YTN 뉴스퀘어 지하1층', '서울 마포구 월드컵북로 361 1층 103호, 서울 마포구 성암로 229-1', '서울 마포구 월드컵북로 375 이안1단지 1층', '서울 마포구 월드컵북로48길 29-12', '서울 마포구 성암로15길 43 1층']
const representative_food = ['김치찌개', '태국음식(나시고랭, 팟타이 등)', '샤브샤브(칼국수)', '수제버거', '샤브샤브', '일식(규카츠, 덮밥)', '우육면, 탄탄면, 샤오롱바오', '우육면, 샤오롱바오', '곰탕', '돼지불백, 제주흑돼지 등', '차돌 쌀국수', '중식(짜장, 짬뽕 등)', '돈카츠(로스카츠, 히레카츠)', '가츠동', '나시고랭, 팟타이 등', '제주해장국', '경양식 돈까스, 함박스테이크 등', '샤브샤브', '캘리포니아롤', '일식 덮밥(사케동, 스테이크덮밥 등)', '양식(파스타, 빠네) - 데이트 추천', '평양냉면, 갈비탕(+고기집)', '꼬막 음식점', '참치 전문점(강사님 사주세요)', '보쌈정식, 감자옹심이 등', '양식(피자, 파스타 등) - 데이트 추천', '낙지볶음, 낙곱새볶음', '돈까스', '중식(짜장, 짬뽕 등)', '탄탄멘, 스테이크덮밥', '콩나물 국밥', '순대국밥, 나주곰탕 등', '국밥(a.k.a. 부산아지매)', '양평 해장국', '뼈해장국, 삼계탕 등'];
const price_per_person = ['10000', '20000u', '11000', '11700u', '14000', '19000','9500','15000', '12500', '10000', '15000', '10000', '15000','15000', '12000', '11000', '11000', '15000', '10000', '15000', '16000', '17000', '13000', '35000', '13000', '20000u', '14000', '12000', '10000', '10800', '9000', '13000', '11500', '15000', '11000'];
const name = ['김치도가 상암점', '생어거스틴 상암DMC점', '등촌샤브칼국수 상암점', '바스버거 상암DMC점', '청록미나리식당 상암점', '후라토식당 상암직영점','룽탕 상하이딤섬', '샤오바오 상암점', '서당골 상암점', '동남집', '미분당 상암점', '홍콩반점0410 상암DMC점', '은옥', '온돈부리', '온타이키친', '도락', '경양식당', '채선당 상암DMC점', '미미롤집', '장정정 상암정', '달리181 상암점', '배꼽집 본점', '여수낭만식당', '참치공방 상암점', '시골보쌈&감자옹심이 상암점', '뚜띠쿠치나 상암점', '개미집 상암점', '마이클돈까스 본점', '용무있습니까 상암점', '미도인 상암엠비씨', '전주현대옥 상암DMC점', '김둘레순대국 상암2/4호점', '부산아지매국밥 상암DMC점', '상암 양평 해장국', '푸짐한왕뼈감자탕'];

let teamResult = [];

function team() {
    const whitespaceIsStandard = document.getElementById('splitStandard').checked;
    const separatorElement = whitespaceIsStandard ? true : false;
    const randomNumberLimit = parseInt(document.getElementById('randomNumberLimit').value, 10);
    const useRandomNumbers = document.getElementById('useRandomNumbers').checked;
    const teamMemberNumber = 4;

    if (useRandomNumbers && randomNumberLimit) {
        // Generate teams with random numbers
        teamResult = getRandomNum(randomNumberLimit, teamMemberNumber);
    } else if (separatorElement) {
        const members = document.getElementById('members').value.trim();
        // Generate teams with member names
        const separator =' ';
        teamResult = getRandomTeam({ members, teamMemberNumber, separator });
    } else if (!separatorElement) {
        const members = document.getElementById('members').value;
        const separator =',';
        teamResult = getRandomTeam({ members, teamMemberNumber, separator });
    } 
    else {
        throw new Error('Please provide either a member list or a random number limit.');
    }

    if (teamResult.length === 0) {
        return; // Exit if no teams are generated
    }
}

document.getElementById('splitStandard').addEventListener('click', () => {
    team();
});

document.getElementById('splitComma').addEventListener('click', () => {
    team();
});

document.getElementById('generateBtn').addEventListener('click', () => {
    if(!teamResult || teamResult.length === 0){
        team();
    }

    // 범위는 0부터 34까지 랜덤으로 뽑아주는 코드 생성

    const data = teamResult.map((team) => {
        const randomIndex = Math.floor(Math.random() * (name.length));  
        return {
            team: team.teamName,
            name: team.members.map(member => member.name),
            back: [
                name[randomIndex],  // Circular indexing to match data.js length
                address[randomIndex],
                price_per_person[randomIndex],
                representative_food[randomIndex],
            ],
        }
    });

    // Save and navigate to list.html
    localStorage.setItem('teamData', JSON.stringify(data));
    window.location.href = 'list.html';    
});
