const Sequelize = require('sequelize');

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
            freezeTableName: true,
            timestamps: false
        }
    );

    factor.associate = function (models) {
        // associations can be defined here
    };
    return factor;
};
