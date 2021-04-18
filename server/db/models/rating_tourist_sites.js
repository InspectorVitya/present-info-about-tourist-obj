const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('rating_tourist_sites',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      raiting: {
        allowNull: false,
        type: Sequelize.DataTypes.FLOAT,
      },
    });
};
