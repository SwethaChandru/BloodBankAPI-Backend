var express=require('express');
var router=express.Router();

console.log("hello");
const userCon=require('../controllers/userController');

router.get('/',userCon.getUser);
router.post('/login',userCon.login);
router.post('/',userCon.addUser);
router.put('/',userCon.updateUser);
router.delete('/:id',userCon.deleteUser);


module.exports=router;