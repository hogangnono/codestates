const title = [
    '이 땅이 노른자',
    '지하철 개통 예정',
    '신도시 개발구역',
    '대단지 아파트 입지',
    '신도시 부동산 호재',
    '교통 호재로 기대감 UP',
    '도로개통으로 기대감 증가',
    '미래가치가 높은 교통호재',
    '수도권 주택시장 눈여겨 볼만한 정보'
];

const description = [
    '여기 장난아닐거에요',
    '100년 후에 후손에게 칭찬받을 땅',
    '개발예정이라고 합니다.',
    '돈만 있었다면 남에게 알려주고 싶지 않을 정보',
    '집값 상승을 노려볼만하다',
    '자녀가 있는 집에서 학군을 생각할 때 도움이 될 듯',
    '장기적으로 투자가치가 있는 지역'
];

export const randomTitle = () => {
    const titleLength = title.length;
    const randomIndex = Math.floor(Math.random() * (titleLength - 0));
    return title[randomIndex];
};

export const randomDescription = () => {
    const descriptionLength = description.length;
    const randomIndex = Math.floor(Math.random() * (descriptionLength - 0));
    return description[randomIndex];
};
