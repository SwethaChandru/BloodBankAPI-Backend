const request=require('../Models/receiverRequestModel');
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * To request a blood sample from Hospital 
 * @param {JSON} req request(Blood sample and Hospital Details) sent from the client 
 * @param {JSON} res success or failure response sent to the client
 */
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
            res.status(401).json({
                success: false,
                message: 'DB error'
            });
        }
        else
        {
            res.status(200).json({
                success: true,
                message: 'succesfully added Receivers Request'
            });
        }
    })
}

