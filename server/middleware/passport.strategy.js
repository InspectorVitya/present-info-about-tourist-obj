const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports.adminOrModer = new Strategy(options, async (payload, done) => {
  try {
    if (Date.now() <= payload.exp * 1000 && (payload.userRole === 4 ||  payload.userRole === 2)) {
      done(null, {
        userId: payload.userId,
        roleId: payload.userRole,
        companyId: payload.companyId,

      });
    } else {
      done(null, false);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports.admin = new Strategy(options, async (payload, done) => {
  try {
    if (Date.now() <= payload.exp * 1000 && (payload.userRole === 4)) {
      done(null, {
        userId: payload.userId,
        roleId: payload.userRole,
        companyId: payload.companyId,
      });
    } else {
      done(null, false);
    }
  } catch (e) {
    // логирование
    // eslint-disable-next-line no-console
    console.log(e);
  }
});

module.exports.user = new Strategy(options, async (payload, done) => {
  try {
    if (Date.now() <= payload.exp * 1000 && (payload.userRole === 1 ||  payload.userRole === 2 || payload.userRole === 3 || payload.userRole === 4)) {
      done(null, {
        userId: payload.userId,
        roleId: payload.userRole,
      });
    } else {
      done(null, false);
    }
  } catch (e) {
    // логирование
    // eslint-disable-next-line no-console
    console.log(e);
  }
});

