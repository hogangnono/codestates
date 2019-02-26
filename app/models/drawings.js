const Sequelize = require('sequelize');
const users = require('./users');
const figures = require('./figures');
module.exports = (sequelize, DataTypes) => {
    const drawings = sequelize.define(
        'drawings',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            drawingSetNumber: DataTypes.INTEGER,
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
            usersId: DataTypes.INTEGER,
            figuresId: DataTypes.INTEGER
        },
        {
            timestamps: false
        }
    );
    // users.belongsTo(drawings, { foreignKey: 'usersId' });
    // figures.belongsTo(drawings, { foreignKey: 'figuresId' });
    drawings.associate = function(models) {
        // associations can be defined here
    };
    return drawings;
};
