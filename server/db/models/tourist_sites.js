const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('tourist_sites',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      latlng: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.GEOMETRY('POINT', 4326),
      },
      operating_hours: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      operating_hours_date: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      tickets: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      categorys:{
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNull: false,
      }


    });
};
