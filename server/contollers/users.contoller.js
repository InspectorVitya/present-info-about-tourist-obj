const sequelize = require('../db/sequelize');
const { user } = require('../middleware/passport.strategy');

const { models } = sequelize;

module.exports.user_get = async (req, res) => {
  try {
    const {id} = req.params
    const data = await models.users.findOne({
      where: {id},
      include: [
      {
        model: models.users_info,
      },
      ],
    })
    res.json(data)
  } catch (e) {
    console.log(e);
    res.status("400").json({message: "bad"})
  }
}

module.exports.user_put = async (req, res) => {
  const {mail} = req.body
  const {name, surname} = req.body.users_info
  await models.users.update({
    mail
  }, {where: { id: req.user.userId}})
  await models.users_info.update({
    name, surname
  }, {where: { userId: req.user.userId}})
  res.json({message: "okay"})
}

module.exports.avatar_put = async (req, res) => {

  const path = req.nameFiles[0].path.substr(6)
  await models.users_info.update({
    avatar: path
  }, {where: {userId: req.user.userId }})
  res.json({message: "okey"})
}