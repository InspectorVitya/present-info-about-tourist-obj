const { Router } = require('express');
const usersController = require('../contollers/users.contoller');
const up = require('../middleware/multer');
const router = Router();
const passport = require('passport');
router.get('/:id', usersController.user_get);
router.put('/',passport.authenticate('user', { session: false }), usersController.user_put);
router.post('/avatar', passport.authenticate('user', { session: false }), up.upload.any(),  usersController.avatar_put);
module.exports = router;
