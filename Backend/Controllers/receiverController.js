const request=require('../Models/receiverRequestModel');
var ObjectId = require('mongoose').Types.ObjectId;


module.exports.addReceiver=(req,res)=>{
    const newRequest=new request({
        status:req.body.status,
        bloodSampleID:req.body.bloodSampleID,
        quantity:req.body.quantity,
        hospitalId:req.body.hospitalId
    })

    newRequest.save((err,docs)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.status(200).json({
                success: true,
                message: 'succesfully added blood samples'
            });
        }
    })
}

