const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('users_info',
    {
      phone_number: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      surname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      avatar:{
        allowNull: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      adress: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      organization: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    });
};
