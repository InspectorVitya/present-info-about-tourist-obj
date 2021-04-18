
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequelize = require('../lib/sequelize');

const { models } = sequelize;

module.exports.login_post = async (req, res) => {
  try {
    const { login, password } = req.body;
    const whereParams = {};

    whereParams.login = login;

    const queryParams = {
      where: whereParams,
      include: [
        { model: models.roles }, { model: models.companies }],
    };
    const candidate = await models.users.findOne(queryParams);
    if (candidate) {
      if (candidate.blocked == true) {
        return res.status(403).json({ message: 'Вы заблокированы.' });
      }

      if (bcrypt.compareSync(password, candidate.password)) {
        const payload = {
          userId: candidate.id,
          userRole: candidate.role.dataValues.role,
          login: candidate.login,
        };
        if (candidate.companyId) {
          const comp = await models.companies.findOne({
            where: ({ id: candidate.companyId }),
          });
          payload.companyId = candidate.companyId;
          payload.flat_plates = comp.flat_plates;
        }
        if (candidate.arrCompany != null) {
          if (candidate.arrCompany.split(',').length > 0) payload.companyId = candidate.arrCompany.split(',');
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

        // const tokenRfr = uuidv4()

        // await models.refresh_tokens.create({
        //   token: tokenRfr,
        //   os,
        //   browser: browser+version,
        //   useragent: source,
        //   expired_at: moment().add(7,'days').format(),
        //   userId: candidate.id
        // })

        return res.json({ token: `Bearer ${token}` });
      }
      return res.status(404).json({ message: 'Пожалуйста, проверьте правильность написания логина и пароля.' });
    }
    return res.status(404).json({ message: 'Пожалуйста, проверьте правильность написания логина и пароля.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Произошла ошибка на сервере.' });
  }
};

module.exports.singup_post = async (req, res) => {
  try {
    const {
      company_id, surname, name, edit_store,
      patronymic, phone_number, login, email,
      adress, password, role, arrCompany,
    } = req.body;
    const busy = [];

    if (req.user.roleId == 'Младший Админ' && (role == 1 || role == 2)) { return res.status(403).json({ message: 'Нету доступа.' }); }
    const loginBusy = await models.users.findOne({
      where: { login },
    });

    if (loginBusy) { busy.push('login'); }

    if (busy.length != 0) {
      return res.status(404).json({ message: 'Проверьте введенные даныне.', busy });
    }
    // добавление роли
    const hashedPassword = await bcrypt.hash(password, 10);

    let newId;
    let a;
    if (company_id) {
      a = await models.users.create({
        email,
        login,
        edit_store,
        password: hashedPassword,
        companyId: company_id,
        roleId: role,
      });

      newId = a.id;
    } else {
      if (arrCompany.length > 0) {
        a = await models.users.create({
          email,
          login,
          edit_store,
          password: hashedPassword,
          arrCompany: arrCompany.join(),
          roleId: role,
        });
      } else {
        a = await models.users.create({
          email,
          login,
          edit_store,
          password: hashedPassword,
          roleId: role,
        });
      }
      newId = a.id;
    }

    await models.users_info.create({
      userId: newId,
      surname,
      name,
      adress,
      patronymic,
      phone_number,
    });
    return res.status(201).json({ message: 'Пользователь создан.' });
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
