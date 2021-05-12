const sequelize = require('../db/sequelize');

const { models } = sequelize;

module.exports.comment_get = async (req, res) => {
  try {
    const data = await models.comments.findAll({
      where: req.params.postId,
    })
    res.json(data)
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
}

module.exports.comment_post = async (req, res) => {
  try {
    const {text, touristSiteId, raiting} = req.body
    const comment = await models.comments.create({
      text,
      touristSiteId,
      userId: req.user.userId
    })
    await models.rating_tourist_sites.create({
      touristSiteId,
      raiting,
      commentId: comment.id
    })
    res.status(200).end()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
}

module.exports.comment_put = async (req, res) => {

}

module.exports.comment_likes_put = async (req, res) => {

}

module.exports.comment_delete = async (req, res) => {

}
