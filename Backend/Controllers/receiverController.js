const request=require('../Models/receiverRequestModel');


module.exports.getReceiver=(req,res)=>{
    console.log("get receiver");
    request.find({},(err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null)
            {
                res.status(401).json({
                    success:false,
                    message:'no receiver found'
                });
            }
            else
            {
                res.send(docs);
            }
        }
    })
}

module.exports.addReceiver=(req,res)=>{
    console.log("add receiver");
    console.log(req.body);
    const newRequest=new request({
        status:req.body.status,
        bloodSampleNeed:req.body.bloodSampleNeed,
        quantity:req.body.quantity
    })
    
    newRequest.save((err,docs)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(docs);
        }
    })
}

module.exports.updateReceiver=(req,res)=>{
    console.log("enter update receiver");
    console.log(req.body);
    request.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
            $set:{ "status": req.body.status,"bloodSampleNeed":req.body.bloodSampleNeed,
            "quantity":req.body.quantity} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
                console.log(err);
                res.status(401).json({
                    success:false,
                    message:'DB error'
                });
            }
            else
            {
                res.json(docs);
            }
        })   
}

module.exports.deleteReceiver=(req,res)=>{
    request.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(err)
        {
            console.log(id);
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.status(200).json({
                success:false,
                message:'deleted succesffuly'
            });
        }
    })
}