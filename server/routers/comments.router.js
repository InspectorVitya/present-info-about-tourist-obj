const { Router } = require('express');
const commentsController = require('../contollers/comments.controller.js');
const passport = require('passport');
const router = Router();

router.get('/:postId', commentsController.comment_get)
router.post('/', passport.authenticate('user', { session: false }), commentsController.comment_post)
router.put('/', commentsController.comment_put)
router.put('/likes', commentsController.comment_likes_put)
router.delete('/', commentsController.comment_delete)

module.exports = router;
