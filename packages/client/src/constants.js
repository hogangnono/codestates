export const newToggleBox = {
    상권: false,
    '신축/재개발': false,
    교육: false,
    업무지구: false,
    주택단지: false,
    '도로개통/확장': false,
    지하철개통: false,
    기타: false
};
export const colorList = [
    'Crimson', // 1
    'DarkOrange', // 2
    'SeaGreen', // 3
    'Navy', // 4
    'Peru', // 5
    'HotPink', // 6
    'SlateGray', // 7
    'Red' // 8
];

export const typeOfShape = {
    0: 'Line',
    1: 'Arrow',
    2: 'Rect',
    3: 'Circle',
    4: 'Polygon'
};

export const API_HOST = 'https://hogangnono.jihune.com';
// export const API_HOST = 'http://localhost:3001';
export const API_USER_PATH = API_HOST + '/user';
export const API_USER_LOAD_PATH = API_HOST + '/user/load';
export const API_USER_SAVE_PATH = API_HOST + '/user/save';
export const API_USER_USERDRAWING_PATH = API_HOST + '/user/userdrawing';
export const SLACK_GENERAL_PATH = 'https://hooks.slack.com/services/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';
