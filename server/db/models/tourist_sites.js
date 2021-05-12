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
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.FLOAT),
      },
      operating_hours: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      operating_hours_date: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      tickets: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      description: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },



    });
};
