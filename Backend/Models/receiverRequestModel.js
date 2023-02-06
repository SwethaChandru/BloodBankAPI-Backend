const mongoose=require('mongoose')


var recevierRequestScheme = mongoose.Schema({
    status:{
        type:String
    },
    bloodSampleNeed:{
        type:String
    },
    quantity:{
        type:Number
    }
})

module.exports=mongoose.model('ReceiverCollection',recevierRequestScheme);