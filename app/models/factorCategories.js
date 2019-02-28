const Sequelize = require('sequelize');

const factors = [
    '기타',
    '상권형성',
    '지하철개통',
    '재건축',
    '국제행사',
    '도로개통/확장',
    '공공기관/문화생활/대형병원 시설',
    '그린벨트해제',
    '교통편의성 증대'
];

module.exports = (sequelize, DataTypes) => {
    const factorCategories = sequelize.define(
        'factorCategories',
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
            timestamps: false
        }
    );
    for (let index = 0; index < factors.length; index++) {
        factorCategories
            .findOrCreate({
                where: {
                    name: factors[index]
                }
            })
            .spread((category, created) => {
                console.log(`Created a new category named ${factors[index]}`);
            });
    }

    factorCategories.associate = function (models) {
        // associations can be defined here
    };
    return factorCategories;
};
