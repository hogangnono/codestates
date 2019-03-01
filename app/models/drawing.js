const Sequelize = require('sequelize');
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
            user_id: DataTypes.INTEGER,
            factor_id: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );

    drawing.associate = models => {
        drawing.belongsTo(models.user, { foreignKey: 'user_id' });
        drawing.belongsTo(models.factor, { foreignKey: 'factor_id' });
        // associations can be defined here
    };
    return drawing;
};
