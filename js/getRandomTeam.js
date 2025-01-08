const splitter = (str, separator) => {
    let memberList = [];
    if(separator === ' ') {
        memberList = str.split(/\s+/);
    } else {
        memberList = str.split(separator);
    }
    return memberList;
}

const generateRandomKey = () => Math.random();

const getRandomNum = (limit, teamMemberNumber) => {
    if (!limit || limit <= 0) {
        throw new Error('Limit must be a positive number.');
    }

    const numbers = Array.from({ length: limit }, (_, i) => i);
    numbers.sort(() => Math.random() - 0.5);

    const totalTeam = Math.ceil(limit / teamMemberNumber);

    const teamList = Array.from({ length: totalTeam }, () => []);
    numbers.forEach((num, idx) => {
        const teamIndex = idx % totalTeam;
        teamList[teamIndex].push({ name: num + 1 });
    });

    return teamList.map((team, idx) => ({
        teamName: `${idx + 1}팀`,
        members: team,
    }));
};

const getRandomTeam = ({ members, teamMemberNumber, separator }) => {
    const memberList = splitter(members, separator);
    if (memberList.length > 40) {
        alert('최대 40명까지만 입력 가능합니다.');
        return [];
    }

    if (teamMemberNumber > 4) {
        alert('한 팀당 최대 4명까지만 입력 가능합니다.');
        return [];
    }

    const membersWithKey = memberList.map((member) => ({
        name: member.trim(),
        key: generateRandomKey(),
    }));

    membersWithKey.sort((a, b) => a.key - b.key);

    const totalTeam = Math.ceil(memberList.length / teamMemberNumber);

    const teamList = Array.from({ length: totalTeam }, () => []);
    membersWithKey.forEach((member, idx) => {
        const teamIndex = idx % totalTeam;
        teamList[teamIndex].push(member);
    });

    return teamList.map((team, idx) => ({
        teamName: `${idx + 1}팀`,
        members: team,
    }));
};

function getRanNum(max) {
    const randomIndex = Math.floor(Math.random() * (max));  
    return randomIndex;
}

export { getRandomNum, getRandomTeam, getRanNum };