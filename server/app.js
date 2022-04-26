const express=require('express');
const app=express();
const mangoose=require('mongoose');
const port=5000;
const {MONGOURI}=require('./keys');



mangoose.connect(MONGOURI, {useNewUrlParser:true,useUnifiedTopology:true});
mangoose.connection.on('connected',()=>{console.log('connected successfuly')});
mangoose.connection.on('error',(err)=>{console.log('error whileconnecting:',err)});


require('./models/user');
require('./models/post')
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


app.get('/home',(req,res)=>{
    res.send("hello world")
});
app.listen(port,()=>console.log("server is running",port));
