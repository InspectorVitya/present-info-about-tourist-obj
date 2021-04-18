const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('photos',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.STRING,
      },

    });
};
