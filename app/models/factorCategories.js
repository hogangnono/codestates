const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const factorCategories = sequelize.define(
        'factorCategories',
        {
            name: DataTypes.STRING,
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
    factorCategories.associate = models => {
        // associations can be defined here
    };
    return factorCategories;
};
