const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const figure = sequelize.define(
        'figure',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            center_lat: DataTypes.DOUBLE,
            center_lng: DataTypes.DOUBLE,
            figures: DataTypes.STRING,
            css: DataTypes.STRING,
            factor_id: DataTypes.INTEGER,
            drawing_id: DataTypes.INTEGER
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
    // figure.removeAttribute('updatedAt');
    figure.associate = models => {
        figure.belongsTo(models.factor, { foreignKey: 'factor_id' });
        figure.belongsTo(models.drawing, { foreignKey: 'drawing_id' });
        // associations can be defined here
    };
    return figure;
};
