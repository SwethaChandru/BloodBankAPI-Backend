var mongoose=require('mongoose');
var express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');

var app=express(); 
app.use(cors({}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 

const PORT=3000;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/Users', { useNewUrlParser: true,useunifiedTopology:true }, (err) => {
    if (err) {
      console.log(err);
      console.log('Error while Connecting!')
    } else {
      console.log('Connected to Mongo DB')
    }
  });

const userRoute=require('./Routes/userRoute');
app.use('/users',userRoute);

const receiverRoute=require('./Routes/receiverRequestRoute');
app.use('/receivers',receiverRoute);

app.listen(PORT,()=>{
    console.log('server has been started at port:' +PORT);
})