const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Figure = sequelize.define(
        'Figure',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            center_lat: DataTypes.DOUBLE,
            center_lng: DataTypes.DOUBLE,
            figures: DataTypes.STRING,
            description: DataTypes.STRING,
            css: DataTypes.STRING,
            factor_id: DataTypes.INTEGER,
            drawing_id: DataTypes.INTEGER
        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: false,
            freezeTableName: true
        }
    );
    Figure.associate = models => {
        Figure.belongsTo(models.Factor, { foreignKey: 'factor_id' });
        Figure.belongsTo(models.Drawing, { foreignKey: 'drawing_id' });
    };
    return Figure;
};
