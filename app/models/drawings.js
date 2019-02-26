// const Sequelize = require('sequelize');
const users = require('./users');
const figures = require('./figures');
module.exports = (sequelize, DataTypes) => {
    const drawings = sequelize.define(
        'drawings',
        {
            drawingSetNumber: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
            usersId: DataTypes.INTEGER,
            figuresId: DataTypes.INTEGER
        },
        {
            timestamps: false
        }
    );
    drawings.removeAttribute('id');
    // users.belongsTo(drawings, { foreignKey: 'usersId' });
    // figures.belongsTo(drawings, { foreignKey: 'figuresId' });
    drawings.associate = function(models) {
        // associations can be defined here
    };
    return drawings;
};
