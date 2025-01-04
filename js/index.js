import { getRandomNum, getRandomTeam, getRanNum } from '/js/getRandomTeam.js';
import { name, address, price_per_person, representative_food } from '/js/database.js';
// Database

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
        
        const randomIndex = getRanNum(name.length);  
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
