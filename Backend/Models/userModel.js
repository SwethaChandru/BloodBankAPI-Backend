const mongoose=require('mongoose')


var userSchema = mongoose.Schema({
    type:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phonenum:{
        type:Number
    },
    address:{
        type:String
    }
})

module.exports=mongoose.model('userCollection',userSchema);