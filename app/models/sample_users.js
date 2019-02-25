
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            name: DataTypes.STRING,
            vegLevel: DataTypes.STRING
        },
        {
            timestamps: false
        }
    );
    users.associate = function(models) {
        // associations can be defined here
    };
    return users;
};
