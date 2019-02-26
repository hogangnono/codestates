module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            name: DataTypes.STRING
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
