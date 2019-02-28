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
            timestamps: false
        }
    );
    users.associate = models => {
        // associations can be defined here
    };

    return users;
};
