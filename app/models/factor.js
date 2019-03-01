const Sequelize = require('sequelize');

const factors = [
    '기타',
    '상권 형성',
    '지하철 개통',
    '재건축',
    '국제행사',
    '도로개통/확장',
    '공공기관/문화생활/대형병원 시설',
    '그린벨트 해제',
    '교통편의성 증대'
];

module.exports = (sequelize, DataTypes) => {
    const factor = sequelize.define(
        'factor',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING
        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: false,
            freezeTableName: true
        }
    );
    // for (let index = 0; index < factors.length; index++) {
    //     factor
    //         .findOrCreate({
    //             where: {
    //                 name: factors[index]
    //             }
    //         })
    //         .spread((category, created) => {
    //             console.log(`Created a new category named ${factors[index]}`);
    //         })
    //         .catch(err => {
    //             console.log('err입니다. 카테고리 추가를 못했습니다.');
    //         });
    // }

    factor.associate = models => {
        // associations can be defined here
    };
    return factor;
};
