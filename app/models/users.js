const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            timestamps: false
        }
    );
    users.associate = function(models) {
        // associations can be defined here
    };

    return users;
};
