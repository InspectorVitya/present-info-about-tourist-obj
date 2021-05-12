const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('comments',
    {
      id: {autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
     // commentAuthorId: {type: DataTypes.INTEGER, allowNull: false},
      text: {type: DataTypes.TEXT, allowNull: false}, // текст комментария
      //articleId: {type: DataTypes.INTEGER, allowNull: false}, // айди статьи, к которой был оставлен коммент
      answeringId: {type: DataTypes.INTEGER, allowNull: true}, // важно! это айди(первый пункт), коммента на который прилетел ответ, если коммент к статье, но тут NULL
      likes: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0} // лукасы на коммент3
    });
};
