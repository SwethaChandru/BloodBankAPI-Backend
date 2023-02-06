var express=require('express');
var router=express.Router();

console.log("hello");
const receiverCon=require('../controllers/receiverController');

router.get('/',receiverCon.getReceiver);
router.post('/',receiverCon.addReceiver);
router.put('/',receiverCon.updateReceiver);
router.delete('/:id',receiverCon.deleteReceiver);


module.exports=router;