const express = require('express');
const router = express.Router();
const con = require('../utils/databse')
var multer = require('multer');

var storageObj = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        let dt = new Date().getTime();
        cb(null, String(dt) + file.originalname);
    }
});

var upload = multer({ storage: storageObj });


const VacationController = require('../controllers/vacation')

router.post('/addVacation', upload.array("uploads[]", 12), VacationController.addVacation)

router.get('/addVacationTextImg', VacationController.addVacationTextImg)

router.get('/allVacations', VacationController.getVacs)

router.get('/deleteVacation', VacationController.deleteSelectedVacation)

router.get('/updateFollow', VacationController.updateFollowers)

router.get('/updateToMinus', VacationController.updateFollowersMinus)

router.get('/updateVacation', VacationController.updateVacDetail)

router.get('/addUserByVacation', VacationController.addToUserVacation)

router.get('/deleteUserByVacation', VacationController.deleteVacUser)



module.exports = router;
