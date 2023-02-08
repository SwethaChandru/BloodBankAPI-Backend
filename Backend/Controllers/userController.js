const user = require('../Models/userModel');
const bloodSample = require('../Models/bloodSampleModel');
const request=require('../Models/receiverRequestModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

// module.exports.getUser = (req, res) => {
//     user.find({}, (err, docs) => {
//         if (err) {
//             res.status(401).json({
//                 success: false,
//                 message: 'DB error'
//             });
//         }
//         else {
//             if (docs === null) {
//                 res.status(401).json({
//                     success: false,
//                     message: 'no books found'
//                 });
//             }
//             else {
//                 res.send(docs);
//             }
//         }
//     })
// }


// module.exports.updateUser = (req, res) => {
//     console.log("enter update User");
//     user.findByIdAndUpdate({ _id: ObjectId(req.body.id) },
//         {
//             $set: {
//                 "type": req.body.type, "username": req.body.username, "passwd": req.body.passwd, "name": req.body.name,
//                 "mail": req.body.mail, "phonenum": req.body.phonenum, "address": req.body.address
//             }
//         },
//         {
//             upsert: true, new: true
//         },
//         function (err, docs) {
//             if (err) {
//                 console.log(err);
//                 res.status(401).json({
//                     success: false,
//                     message: 'DB error'
//                 });
//             }
//             else {
//                 res.json(docs);
//             }
//         })
// }


module.exports.addUser = (req, res) => {
    console.log("enter signup");
    user.findOne({ email: req.body.email }, (err, docs) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: 'DB error'
            });
        }
        else {
            if (docs === null) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const newUser = new user({
                            type: req.body.type,
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            phonenum: req.body.phonenum,
                            address: req.body.address
                        });
                        newUser.save((err, items) => {
                            if (err) {
                                res.status(401).json({
                                    success: false,
                                    message: 'DB error'
                                });
                            }
                            else {
                                res.status(201).json({
                                    success: true,
                                    message: 'succesfully sign up'
                                });
                            }
                        })
                    })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: " The email is already registered "
                })
            }
        }
    })
}

module.exports.login = (req, res) => {
    let fetchedUser;
    user.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The email is not registerted with the account"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: "invalid password "
                })
            }
            else {
                const data = {
                    type: fetchedUser.type,
                    id: fetchedUser._id,
                };
                const token = jwt.sign(data, 'secret_this_should_be_longer', { expiresIn: '3h' });
                res.status(201).json({
                    success: true,
                    token: token
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: "Auth failed"
            });
        });
}

module.exports.addBloodSamples = (req, res) => {
    console.log("enter addBlood");
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);

    if (decoded.type == "Hospital") {
        const newDetails = new bloodSample({
            userid: decoded.id,
            bloodSampleName: req.body.bloodSampleName,
            unit: req.body.unit
        })
        newDetails.save((err, items) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'DB error'
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'succesfully added blood samples'
                });
            }
        })
    }
}


module.exports.updateBloodSamples = (req, res) => {
    console.log("enter update blood");

    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);

    if (decoded.type == "Hospital") {
        bloodSample.find({ userid: ObjectId(decoded.id) }, (err, docs) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'DB error'
                });
            }
            else {
                if (docs === null) {
                    console.log("No blood sample data are present in this hospital name")
                }
                else {
                    
                    bloodSample.updateOne({ bloodSampleName: req.body.bloodSampleName, userid: ObjectId(decoded.id) },
                        { $set: {unit: req.body.quantity } }, (err, docs) => {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                message: 'DB error'
                            });
                        }
                        else {
                            if (docs === null) {
                                res.status(401).json({
                                    success: false,
                                    message: 'no samples found'
                                });
                            }
                            else {
                                res.status(201).json({
                                    success: true,
                                    message: 'succesfully updated blood samples'
                                });
                            }
                        }
                    })

                }
            }
        })
    }
}





module.exports.deleteBloodSamples = (req, res) => {
    console.log("delete blood sample")
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);

    if (decoded.type == "Hospital") {
        bloodSample.find({ userid: ObjectId(decoded.id) }, (err, docs) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'DB error'
                });
            }
            else {
                console.log("document");
                console.log(docs);
                if (docs === null) {
                    console.log("no blood sample data are present in this hospital name")
                }
                else {
                    
                    bloodSample.deleteOne({ bloodSampleName: req.body.bloodSampleName, userid: ObjectId(decoded.id) },
                         (err, docs) => {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                message: 'DB error'
                            });
                        }
                        else {
                            if (docs === null) {
                                res.status(401).json({
                                    success: false,
                                    message: 'no blood samples found'
                                });
                            }
                            else {
                                res.status(201).json({
                                    success: true,
                                    message: 'succesfully deleted blood samples'
                                });
                            }
                        }
                    })

                }
            }
        })
    }
}

module.exports.bloodDetails = (req, res) => {
    console.log("enter get blood details");
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);

    if (decoded.type == "Hospital") {
        bloodSample.find({ userid: decoded.id }, (err, docs) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'DB error'
                });
            }
            else {
                if (docs === null) {
                    res.status(401).json({
                        success: false,
                        message: 'no details found'
                    });
                }
                else {
                    res.send(docs);
                }
            }
        })
    }

}

module.exports.allBloodSamples = (req, res) => {
    console.log("get all blood samples");

    bloodSample.aggregate([
        {
            $lookup:
            {
                from: "usercollections",
                localField: "userid",
                foreignField: "_id",
                as: "data"
            }
        }
    ]).exec((err, docs) => {
        if (err) {
            console.log("error");
            console.log(err);
            res.send(err);
        }
        else {
            console.log("else");
            res.send(docs);
        }
    });

}

module.exports.getReceiversRequest=(req,res)=>{
    console.log("enter receivers request");
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);
   
    if (decoded.type == "Hospital") {
        request.find({hospitalId:ObjectId(decoded.id)},(err,docs)=>{
            if(err)
            {
                console.log("enter err");
                console.log(err);
                res.send(err);
            }
            else
            {
                console.log("enter success")
                res.send(docs);
            }
        })
    }


}