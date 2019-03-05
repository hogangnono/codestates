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
            user_id: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
    // drawing.removeAttribute('updatedAt');
    drawing.associate = models => {
        drawing.belongsTo(models.user, { foreignKey: 'user_id' });
        // associations can be defined here
    };
    return drawing;
};
