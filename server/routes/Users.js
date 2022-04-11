const express = require('express');
const router = express.Router();
const con = require('../utils/databse');

const UserController = require('../controllers/users')

router.get('/addUser', UserController.addUsers);

router.get('/getUsers', UserController.getUsers)

router.get('/checkUsers', UserController.checkUser)

router.get('/checkMail', UserController.checUserMail)

router.get('/deleteUser', UserController.deleteSelectedUser)



module.exports = router;