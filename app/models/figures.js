// const Sequelize = require('sequelize');
// const factorCategories = require('./factorCategories');

module.exports = (sequelize, DataTypes) => {
    const figures = sequelize.define(
        'figures',
        {
            id: {
                type: DataTypes.INTEGER,
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
            factorCategoryId: DataTypes.INTEGER
        },
        {
            timestamps: false
        }
    );

    figures.associate = models => {
        figures.belongsTo(models.factorCategories, {
            foreignKey: 'factorCategoryId'
        });
        // associations can be defined here
    };
    return figures;
};
