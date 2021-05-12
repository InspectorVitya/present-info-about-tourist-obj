/* eslint-disable camelcase */
/* eslint-disable max-len */
async function applyExtraSetup(sequelize) {
  const {
    users, users_info, tourist_sites,
    category_tourist_sites, rating_tourist_sites,
    roles, photos, comments
  } = sequelize.models;

  roles.hasMany(users);
  users.belongsTo(roles);
  users.hasOne(users_info, { onDelete: 'cascade', hooks: true });
  users_info.belongsTo(users, { onDelete: 'cascade', hooks: true });

  users.hasMany(comments);
  comments.belongsTo(users);
  tourist_sites.hasMany(comments);
  comments.belongsTo(tourist_sites);

  comments.hasMany(rating_tourist_sites);
  rating_tourist_sites.belongsTo(comments);

  tourist_sites.hasMany(rating_tourist_sites);
  rating_tourist_sites.belongsTo(tourist_sites);


  category_tourist_sites.hasMany(tourist_sites);
  tourist_sites.belongsTo(category_tourist_sites);


  tourist_sites.hasMany(photos);
  photos.belongsTo(tourist_sites);

  // await category_tourist_sites.create({category: "Достопримечательности"})
  // await category_tourist_sites.create({category: "Храмы, соборы, мечети"})
  // await category_tourist_sites.create({category: "Мосты"})
  // await category_tourist_sites.create({category: "Площади"})
  // await category_tourist_sites.create({category: "Небоскрёбы"})
  // await category_tourist_sites.create({category: "Фонтаны"})
  // await category_tourist_sites.create({category: "Замки, дворцы"})
  // await category_tourist_sites.create({category: "Галереи"})
  // await category_tourist_sites.create({category: "Музеи"})
  // await category_tourist_sites.create({category: "Национальные парки"})
  // await category_tourist_sites.create({category: "Зоопарки"})
  // await category_tourist_sites.create({category: "Заповедники"})
  // await category_tourist_sites.create({category: "Озера"})
  // await category_tourist_sites.create({category: "Водопады"})
  // await category_tourist_sites.create({category: "Вулканы"})
  // await category_tourist_sites.create({category: "Горы"})
  // await category_tourist_sites.create({category: "Парки"})
  //    await roles.create({role: "Пользоватеь"})
  //    await roles.create({role: "Модератор"})
  //    await roles.create({role: "Владелец"})
  //    await roles.create({role: "Администратор"})
}
module.exports = { applyExtraSetup };
