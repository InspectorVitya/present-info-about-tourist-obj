const { Router } = require('express');
const objController = require('../contollers/tourist_sites.controller.js');
const up = require('../middleware/multer');
const router = Router();

router.get('/all', objController.obj_all_get)
router.get('/:id', objController.obj_get)
router.post('/',up.upload.any(), objController.obj_post)
router.post('/photos',up.upload.any(), objController.newPhoto_put)
router.put('/', up.upload.any(), objController.obj_put)
router.delete('/', objController.obj_delete)

module.exports = router;
