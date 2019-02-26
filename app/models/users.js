module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            name: DataTypes.STRING(32)
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
