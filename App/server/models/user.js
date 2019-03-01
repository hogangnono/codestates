// const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
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
    user.associate = models => {
        // associations can be defined here
    };

    return user;
};
