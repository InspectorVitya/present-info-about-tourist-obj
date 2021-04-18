const { Router } = require('express');
const categortController = require('../contollers/category.controller.js');

const router = Router();

router.get('/', categortController.categort_get)
router.post('/', categortController.categort_post)
router.put('/', categortController.categort_put)
router.delete('/', categortController.categort_delete)

module.exports = router;
