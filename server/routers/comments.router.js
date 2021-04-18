const { Router } = require('express');
const commentsController = require('../contollers/comments.controller.js');

const router = Router();

router.get('/:postId', commentsController.categort_get)
router.post('/', commentsController.categort_post)
router.put('/', commentsController.categort_put)
router.put('/likes', commentsController.categort_put)
router.delete('/', commentsController.categort_delete)

module.exports = router;
