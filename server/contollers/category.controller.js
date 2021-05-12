const sequelize = require('../db/sequelize');

const { models } = sequelize;

module.exports.categort_get = async (req, res) => {
  const data = await models.category_tourist_sites.findAll({
    attributes: ['id', 'category'],
  })
  res.json(data);
}

module.exports.categort_post = async (req, res) => {

}

module.exports.categort_put = async (req, res) => {

}

module.exports.categort_delete = async (req, res) => {

}