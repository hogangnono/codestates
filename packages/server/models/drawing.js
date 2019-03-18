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
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true,
            freezeTableName: true
        }
    );
    Drawing.associate = models => {
        Drawing.belongsTo(models.User, { foreignKey: 'user_id' });
    };
    return Drawing;
};
