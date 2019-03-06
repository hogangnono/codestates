const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Factor = sequelize.define(
        'Factor',
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

    Factor.associate = models => {
        // associations can be defined here
    };
    return Factor;
};
