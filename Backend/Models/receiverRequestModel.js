const mongoose=require('mongoose')
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


var recevierRequestScheme = mongoose.Schema({
    status:{
        type:String
    },
    bloodSampleID:{
        type:ObjectId
    },
    quantity:{
        type:Number
    },
    hospitalId:{
        type:ObjectId
    }
})

module.exports=mongoose.model('ReceiverCollection',recevierRequestScheme);