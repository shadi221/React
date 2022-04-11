const express = require('express');
const router = express.Router();
const con = require('../utils/databse');

const UserController = require('../controllers/join')

router.get('/GetVacByUser', UserController.connectVacationToUser);

module.exports = router;