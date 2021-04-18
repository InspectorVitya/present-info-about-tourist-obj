const { Router } = require('express');
const objController = require('../contollers/tourist_sites.controller.js');

const router = Router();

router.get('/all', objController.obj_all_get)
router.get('/:id', objController.obj_get)
router.post('/', objController.obj_post)
router.put('/', objController.obj_put)
router.delete('/', objController.delete)

module.exports = router;
