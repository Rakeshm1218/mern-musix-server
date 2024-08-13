const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const auth = require('../middleswares/auth');


router.get('/getUsers',userController.getUsers)
router.post('/createUser',userController.createUser)
router.post('/auth',userController.login)



module.exports = router;