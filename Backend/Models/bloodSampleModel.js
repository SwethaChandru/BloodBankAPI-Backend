const mongoose=require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var bloodSampleSchema = mongoose.Schema({
    userid:{
        type:ObjectId
    },
    bloodSampleName:{
        type:String
    },
    unit:{
        type:Number
    }
})

module.exports=mongoose.model('BloodSampleCollection',bloodSampleSchema);