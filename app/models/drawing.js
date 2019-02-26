const factorCategories = require('./factorCategories');
const users = require('./users');

module.exports = (sequelize, DataTypes) => {
    const drawings = sequelize.define(
        'drawings',
        {
            drawingSetNumber: DataTypes.NUMBER,
            shapeType: DataTypes.STRING,
            shapePath: DataTypes.STRING,
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
            description: DataTypes.STRING,
            priority: DataTypes.NUMBER,
            borderWidth: DataTypes.NUMBER,
            borderColor: DataTypes.STRING,
            innerColor: DataTypes.STRING,
            usersId: DataTypes.NUMBER,
            factorCategoriesId: DataTypes.NUMBER
        },
        {
            timestamps: false
        }
    );
    drawings.belongsTo(factorCategories);
    drawings.belongsTo(users);
    // drawings.hasOne(users, { foreignKey: 'usersId' }); // ??
    // drawings.hasOne(factorCategories, { foreignKey: 'factorCategoriesId' }); // ??
    drawings.associate = function(models) {
        // associations can be defined here
    };
    return drawings;
};
