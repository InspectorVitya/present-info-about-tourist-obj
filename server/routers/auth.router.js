const { Router } = require('express');

const authController = require('../contollers/auth.controller');

const router = Router();

router.post('/login', authController.login_post);
router.post('/singup', authController.singup_post);
router.post('/block', authController.userblock_post);
router.post('/unblock', authController.userunblock_post);
router.delete('/', authController.user_delete);
router.put('/', authController.reset_put);

module.exports = router;
