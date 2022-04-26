const express=require('express');
const routers=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {JWT_SECRET} =require('../keys')
const requireLogin =require('../middleware/requirelogin');
/*routers.get('/',(req,res)=>{res.send("hello")});
routers.get('/protected',requireLogin,(req,res)=>{res.send("hello user")});
*/

//user signup authontication
routers.post('/signup',(req,res)=>
{
    const {name,email,password}=req.body ;
if( !name || !email ||!password)
{
  return res.status(422).json({error:"please add all the field"});

}else {
User.findOne({email:email})
.then((savedUser)=>
{
	if(savedUser){
		
		 return res.json({error:"User already exists with this email"});
	}
	 bcrypt.hash(password,12)
    .then(hashedpassword=>
    {
    	const user=new User({
			name,
			email,
			password:hashedpassword
		})
		
		user.save()
		.then(user=>{
		res.json({message:"saved successfully"});	
		})
		.catch(err=>{console.log(err)})
    })
   })
 .catch(err=>
    {
    	console.log(err);
    })
}
})




//signin authontication
routers.post('/signin',(req,res)=>{
    const {email,password}=req.body ;
if( !email ||!password)
{
  return res.status(422).json({error:"please add all the field"});

}else {
   
}
User.findOne({email:email})
.then((savedUser)=>
{
	if(!savedUser){
		
		 return res.json({error:"invalied Email or password"});
	}
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>
    {
    	if(doMatch)
    	{
    		
    		const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
           const {_id,name,email}=savedUser;
    		res.json({token,user:{_id,name,email}})

    	}
    	else
    	{
    		return res.status(422).json({error:"invalied Email or password"})
    	}
    })
    .catch(err=>
    {
    	console.log(err);
    })
   
		
	 
})
.catch(err=>{
console.log(err)})
})

module.exports=routers;