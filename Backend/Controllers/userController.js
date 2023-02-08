const user = require('../Models/userModel');
const bloodSample = require('../Models/bloodSampleModel');
const request=require('../Models/receiverRequestModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.addUser = (req, res) => {
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
            return res.status(401).json({
                success: false,
                message: "Auth failed"
            });
        });
}

module.exports.addBloodSamples = (req, res) => {
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);

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
                    res.status(401).json({
                        success: false,
                        message: 'No blood sample data are present in this hospital name'
                    });
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
                    res.status(401).json({
                        success: false,
                        message: 'no blood samples found'
                    });
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
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);
  
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
                    res.status(201).json({
                        success: true,
                        message: 'Blood Details retreived '
                    });
                }
            }
        })
    }

}

module.exports.allBloodSamples = (req, res) => {
    
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
            res.status(401).json({
                success: false,
                message: 'DB error'
            });
        }
        else {
            res.status(201).json({
                success: true,
                message: 'All blood samples retreived'
            });
        }
    });

}

module.exports.getReceiversRequest=(req,res)=>{
    const token = req.body.token;
    const secretKey = req.body.secretKey;

    const decoded = jwt.verify(token, secretKey);
   
    if (decoded.type == "Hospital") {
        request.find({hospitalId:ObjectId(decoded.id)},(err,docs)=>{
            if(err)
            {
                res.status(401).json({
                    success: false,
                    message: 'DB error'
                });
            }
            else
            {
                res.status(201).json({
                    success: true,
                    message:"Receivers Request details accept"
                });
            }
        })
    }
}