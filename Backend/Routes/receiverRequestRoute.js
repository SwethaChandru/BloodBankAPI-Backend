var express=require('express');

var router=express.Router();

const receiverCon = require('../controllers/receiverController');
router.post('/',receiverCon.addReceiver);


module.exports=router;

