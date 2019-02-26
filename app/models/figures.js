const Sequelize = require('sequelize');
const factorCategories = require('./factorCategories');

module.exports = (sequelize, DataTypes) => {
    const figures = sequelize.define(
        'figures',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            shapeType: DataTypes.STRING,
            shapePath: DataTypes.STRING,
            description: DataTypes.STRING,
            priority: DataTypes.INTEGER,
            borderWidth: DataTypes.INTEGER,
            borderColor: DataTypes.STRING,
            innerColor: DataTypes.STRING,
            factorCategoriesId: DataTypes.INTEGER
        },
        {
            timestamps: false
        }
    );

    // factorCategories.belongsTo(figures, { foreignKey: 'factorCategoriesId' });
    figures.associate = function(models) {
        // associations can be defined here
    };
    return figures;
};
