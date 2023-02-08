var express=require('express');
var router=express.Router();

const userCon=require('../controllers/userController');

router.post('/signup', userCon.addUser);
router.post('/login', userCon.login);

router.post('/addBloodSamples',userCon.addBloodSamples);
router.put('/updateBloodSamples',userCon.updateBloodSamples);
router.delete('/deleteBloodSamples',userCon.deleteBloodSamples);
router.get('/bloodDetails',userCon.bloodDetails)

router.get('/allBloodSamples',userCon.allBloodSamples);
router.post('/ReceiversRequest',userCon.getReceiversRequest);


module.exports=router;