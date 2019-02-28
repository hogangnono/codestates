// const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
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
            timestamps: false
        }
    );
    users.associate = models => {
        // associations can be defined here
    };

    return users;
};
