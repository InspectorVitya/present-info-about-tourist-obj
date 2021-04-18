const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('roles',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
      },
      role: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },

    });
};
