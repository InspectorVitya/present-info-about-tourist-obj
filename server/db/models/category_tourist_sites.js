const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('category_tourist_sites',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
      },
      category: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },

    });
};
