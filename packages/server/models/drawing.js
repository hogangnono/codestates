const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Drawing = sequelize.define(
        'Drawing',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
    Drawing.associate = models => {
        Drawing.belongsTo(models.User, { foreignKey: 'user_id' });
    };
    return Drawing;
};