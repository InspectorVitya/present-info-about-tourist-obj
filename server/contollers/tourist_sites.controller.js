const sequelize = require('../db/sequelize');
const { Op } = require("sequelize");
const { data } = require('./auth.controller');

const { models } = sequelize;

module.exports.obj_get = async (req, res) => {
  const {id} = req.params
  try {
    let data = await models.tourist_sites.findOne({
      where:{id},
      include: [{
        model: models.comments,
        include: [{model: models.rating_tourist_sites}, {model: models.users, include:[{model: models.users_info}]}]
      },
      {
        model: models.photos,
      },
      ],
    })
    const rating = await models.rating_tourist_sites.findAll({
      where: {
        touristSiteId: id
      }
    })
    data = JSON.parse(JSON.stringify(data))

    let rait = 0;
    if (rating.length > 0){
      for (let i = 0; i < rating.length; i++) {
        rait += rating[i].raiting
      }
      data.avgrating = rait / rating.length
      data.avgrating = {
        raiting: parseFloat(data.avgrating.toFixed(1)),
        count: rating.length
      }
    }else {
      data.avgrating = {
        raiting: rait,
        count: 0
      }
    }
    //console.log(rait / rating.length);
    res.json(data)
  } catch (e) {
    console.log(e);
  }
}

module.exports.obj_all_get = async (req, res) => {
  try {
    let data = {}
    if(req.query.filter){
    const filter = req.query.filter.split(',').map((el)=>{
      return parseInt(el)
    })

    data = await models.tourist_sites.findAll({
      where: {
        categoryTouristSiteId: {[Op.in]: filter, },
      },
      include: [
      {
        model: models.photos,
      },
      {
        model: models.rating_tourist_sites,
      },
      ],

    })
  }
    res.json(data)
  } catch (e) {
    console.log(e);
    res.status("400").json({message: "bad"})
  }
}

module.exports.obj_post = async (req, res) => {
  try {
    let insertValue;
    if (req.body.data) {
      insertValue = JSON.parse(req.body.data);
    } else { insertValue = req.body; }
    // console.log(insertValue);
    // console.log(req.nameFiles);
    const data = await models.tourist_sites.create(insertValue)
    const photos = []
    for (const file of req.nameFiles) {
      console.log(file);
      photos.push({
        touristSiteId: data.id,
        url: file.path.substr(6)
      })
    }
    await models.photos.bulkCreate(photos)
    res.json({message: "ok"})
  } catch (error) {
    console.log(error);
    res.status("400").json({message: "bad"})
  }

}

module.exports.obj_delete= async (req, res) => {
try {
  const {id} = req.body
  await models.tourist_sites.destroy({
    where: {id: id}
  })
  res.json({message: "okey"})
} catch (e) {
  console.log(e);
  res.status("400").json({message: "bad"})
}
}

module.exports.obj_put= async (req, res) => {
  try {
    let insertValue;

    if (req.body.data) {
      insertValue = JSON.parse(req.body.data);
    } else { insertValue = req.body; }
    let id = insertValue.id
    delete insertValue.id
    const data = await models.tourist_sites.update({
      insertValue
    },{where: {id},})
    const photos = []
    if (req.nameFiles){
    for (const file of req.nameFiles) {
      console.log(file);
      photos.push({
        touristSiteId: data.id,
        url: file.path.substr(6)
      })
    }
    await models.photos.bulkCreate(photos)
    }
    res.json({message: "ok"})
  } catch (error) {
    console.log(error);
    res.status("400").json({message: "bad"})
  }
}

module.exports.newPhoto_put= async (req, res) => {
try {

  const photos = []
  for (const file of req.nameFiles) {
    console.log(file);
    photos.push({
      touristSiteId: parseInt(req.body.data),
      url: file.path.substr(6)
    })
  }
  await models.photos.bulkCreate(photos)
} catch (error) {
  console.log(error);
}
}