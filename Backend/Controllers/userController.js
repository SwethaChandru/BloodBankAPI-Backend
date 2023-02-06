const user=require('../Models/userModel');
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');

module.exports.getUser=(req,res)=>{
    console.log("hello1");
    user.find({},(err,docs)=>{
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
                    message:'no books found'
                });
            }
            else
            {
                res.send(docs);
            }
        }
    })
}


module.exports.updateUser=(req,res)=>{
    console.log("enter update User");
    console.log(req.body);
    user.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
            $set:{ "type": req.body.type,"username":req.body.username,"passwd":req.body.passwd,"name":req.body.name,
            "mail":req.body.mail,"phonenum":req.body.phonenum,"address":req.body.address} 
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

module.exports.deleteUser=(req,res)=>{
    book.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
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


module.exports.addUser=(req,res)=>{
    console.log("enter signup");
    user.findOne({email:req.body.email},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null){
                bcrypt.hash(req.body.password,10)
                .then(hash=>{
                    const newUser=new user({
                        type:req.body.type,
                        email:req.body.email,
                        password:hash,
                        name:req.body.name,
                        phonenum:req.body.phonenum,
                        address:req.body.address
                    });
                    newUser.save((err,items)=>{
                        if(err)
                        {
                            res.status(401).json({
                                success:false,
                                message:'DB error'
                            });
                        }
                        else
                        {
                            res.status(200).json({
                                success:true,
                                message:'succesfully sign up'
                            });
                        }
                    })
                //     .catch(err=>{
                //         res.status(500).json({
                //         error:err
                //     })
                // })
            })
        }
        else
        {
            res.status(401).json({
                success:false,
                message:"email already present"
            })
        }
    }
})
}

module.exports.login=(req,res)=>{
    let fetchedUser;
    console.log(req.body);
    user.findOne({email:req.body.email}).then(user=>{
        console.log(user);
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"invalid user name"
            });
        }
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
               success:false,
               message:"invalid password "
            })
        }
        else
        {
            const token=jwt.sign({},'secret_this_should_be_longer',{expiresIn:'1h'});
            res.status(200).json({
            success:true,
            token:token
        });
        } 
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Auth failed"
        });
    });
}