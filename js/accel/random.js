import { splitter } from './array.js';

export const randomBelow = (max) => Math.floor(Math.random() * (max));

export const getRandomNumberTeam = (limit, teamMemberNumber) => {
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

export const getRandomTeam = ({ members, teamMemberNumber, separator }) => {
    let memberList = [];
    if( separator === 'x') {
        memberList = members;
    } else {
        memberList = splitter(members, separator);
    }
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
        key: Math.random(),
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

export const getRandomIndexArray = function (setSize, numArr) {
    const randomSet = new Set();
    const numArrSize = numArr.length;
    if (setSize > numArrSize){
        console.log('뽑으려는 숫자가 후보보다 많습니다!');
        return numArr;
    }
    while(randomSet.size < setSize) {
        const numToAdd = numArr[randomBelow(numArrSize)];
        randomSet.add(numToAdd);
        if (randomSet.size === setSize) return Array.from(randomSet);
    }
}
