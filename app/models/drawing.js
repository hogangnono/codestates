const Sequelize = require('sequelize');
// const users = require('../models').users;
// const figures = require('./figures');
module.exports = (sequelize, DataTypes) => {
    const drawing = sequelize.define(
        'drawing',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            map_center_lat: DataTypes.DECIMAL,
            map_center_lng: DataTypes.DECIMAL,
            figures: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            user_id: DataTypes.INTEGER,
            factor_id: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
    drawing.removeAttribute('updatedAt');
    drawing.associate = function (models) {
        drawing.belongsTo(models.user, { foreignKey: 'user_id' });
        drawing.belongsTo(models.factor, { foreignKey: 'factor_id' });
        // associations can be defined here
    };
    return drawing;
};
