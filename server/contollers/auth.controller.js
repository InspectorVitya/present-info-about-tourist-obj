
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequelize = require('../db/sequelize');

const { models } = sequelize;

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const candidate = await models.users.findOne({
      where: {mail: email},
      include: [
        { model: models.roles }, { model: models.users_info
         }],
    });
    if (candidate) {
      if (candidate.blocked) {
        return res.status(403).json({ message: 'Вы заблокированы.' });
      }

      if (bcrypt.compareSync(password, candidate.password)) {
        const payload = {
          userId: candidate.id,
          userRole: candidate.role.dataValues.id,
          login: candidate.users_info.name + " " + candidate.users_info.surname,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });


        return res.json({ token: `Bearer ${token}` });
      }
      return res.status(400).json({ message: 'Пожалуйста, проверьте правильность написания логина и пароля.' });
    }
    return res.status(400).json({ message: 'Пожалуйста, проверьте правильность написания логина и пароля.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
};

module.exports.singup_post = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;



    const busy = await models.users.findOne({
      where: { mail: email },
    });
    console.log(busy);

    if (busy) {
      return res.status(400).json({ message: 'Почта занята.'});
    }
    // добавление соли
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await models.users.create({
      mail: email,
      password: hashedPassword,
      roleId: 1,
    });
    await models.users_info.create({
      userId: newUser.id,
      surname: firstName,
      name: lastName,
    });
    return res.status(201).json({ message: 'Пользователь создан.'});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
};

module.exports.reset_put = async (req, res) => {
  try {
    const {
      id, company_id, surname, name, patronymic, phone_number, login, email, adress, password, role,
    } = req.body;
    if (req.user.companyId != company_id && req.user.roleId == 'Младший Админ') { return res.status(403).json({ message: 'Нету доступа.' }); }
    const oldData = await models.users.findOne({ where: { id } });
    const busy = [];
    if (oldData.email != email) {
      const emailBusy = await models.users.findOne({
        where: { email },
      });
      if (emailBusy) { busy.push('email'); }
    }
    if (oldData.login != login) {
      const loginBusy = await models.users.findOne({
        where: { login },
      });
      if (loginBusy) { busy.push('login'); }
    }

    if (busy.length != 0) {
      return res.status(404).json({ message: 'Проверьте введенные даныне.', busy });
    }
    // добавление роли
    if (password !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      await models.users.update({
        email,
        login,
        password: hashedPassword,
        companyId: company_id || null,
        roleId: role,
      }, { where: { id } });
    } else {
      await models.users.update({
        email,
        login,
        companyId: company_id || null,
        roleId: role,
      }, { where: { id } });
    }

    await models.users_info.update({
      userId: id,
      surname,
      name,
      adress,
      patronymic,
      phone_number,
    }, { where: { userId: id } });
    return res.status(201).json({ message: 'Данные обновлены.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
};

module.exports.userblock_post = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await models.users.findOne(
      {
        where: { id: userId },
        attributes: ['companyId', 'id'],
      },
    );
    if (req.user.companyId != user.companyId && req.user.roleId == 'Младший Админ') { return res.status(403).json({ message: 'Нету доступа.' }); }
    await models.users.update({ blocked: true }, { where: { id: userId } });

    return res.json({ message: 'Пользователь заблокирован' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports.userunblock_post = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await models.users.findOne(
      {
        where: { id: userId },
        attributes: ['companyId', 'id'],
      },
    );
    if (req.user.companyId != user.companyId && req.user.roleId == 'Младший Админ') { return res.status(403).json({ message: 'Нету доступа.' }); }
    await models.users.update({ blocked: false }, { where: { id: userId } });

    return res.json({ message: 'Пользователь разблокирован.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка.' });
  }
};

module.exports.user_delete = async (req, res) => {
  const { usersId } = req.body;
  try {
    const users = await models.users.findAll(
      {
        where: { id: usersId },
        attributes: ['companyId', 'id'],
      },
    );
    let errDostup = false;
    // eslint-disable-next-line consistent-return
    users.forEach((el) => {
      if (req.user.companyId != el.companyId && req.user.roleId == 'Младший Админ') {
        errDostup = true;
      }
    });
    if (errDostup) return res.status(403).json({ message: 'Нету доступа.' });
    await models.users.destroy({ where: { id: usersId } });

    return res.json({ message: 'Пользователь(-ли) удален(-ны).' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
};

module.exports.data = async (req, res) => {
  res.status(200);
};
