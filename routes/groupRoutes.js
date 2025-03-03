const express = require('express');
const { addGroupController, getGroupController, DeleteGroupController, UptadeGroupController } = require('../controller/groupController');

const router = express.Router();
router.route('/add').post(addGroupController);
router.route('/get/:id').get(getGroupController);
router.route('/delete/:id').delete(DeleteGroupController);
router.route('/update/:id').patch(UptadeGroupController);

module.exports = router
