const express = require('express');
const { addController, getController, DeleteController, getControllerById, UpdateController, searchController } = require('../controller/contactController');

const router = express.Router();
router.route('/contact').post(addController);
router.route('/get/:id').get(getController).delete(DeleteController);
router.route('/getById/:id').get(getControllerById).patch(UpdateController);
// router.route('/search/:search').get(searchController);

module.exports = router
