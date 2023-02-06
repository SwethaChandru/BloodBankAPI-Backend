const mongoose=require('mongoose')


var bloodSampleSchema = mongoose.Schema({
    userid:{
        type:Number
    },
    bloodSampleName:{
        type:String
    },
    unit:{
        type:Number
    }
})

module.exports=mongoose.model('BloodSampleCollection',bloodSampleSchema);