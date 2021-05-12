const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('users',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique: true,
        primaryKey: true,
      },
      mail: {
        allowNull: true,
        unique: true,
        type: Sequelize.DataTypes.STRING(255),
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      blocked: {
        defaultValue: false,
        allowNull: true,
        type: Sequelize.DataTypes.BOOLEAN,
      },

    });
};
