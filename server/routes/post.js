const express=require('express');
const routers=express.Router();
const mongoose=require('mongoose');
const requireLogin =require('../middleware/requirelogin');
const Post=mongoose.model("Post");




routers.get('/allpost',requireLogin,(req,res)=>
{
	Post.find()
	.populate("postedBy","_id name")
	.populate("comments.postedBy","_id name")
	.then(posts=>{
		res.json({posts})
	})
})





routers.post('/createpost',requireLogin,(req,res)=>
{
	const {title,body,pic}=req.body
	console.log('url:',pic)
	if(!title || !body || !pic)
	{
		return res.status(422).json({error:"please add all the fields"})
	}
	console.log(req.user)
	req.user.password=undefined
	const post =new Post({
		title,
		body,
		photo:pic,
		postedBy:req.user
	})
	post.save().then(result=>{
		res.json({post:result})
	}).catch(err=>{
		console.log(err)
	})
})

routers.get('/mypost',requireLogin,(req,res)=>{
	console.log(req.user._id);
	Post.find({postedBy:req.user._id})
	.populate("postedBy","_id name")
	.then(mypost=>{
		res.json({mypost})
	})
	.catch(err=>
	{
		console.log(err)
	})

})

routers.put("/like",requireLogin,(req,res)=>{
	Post.findByIdAndUpdate(req.body.postId,{
		$push:{likes:req.user._id}
	},{
		new:true
	}).exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})
		}else{
			res.json(result)
		}
	})
})
routers.put("/unlike",requireLogin,(req,res)=>{
	Post.findByIdAndUpdate(req.body.postId,{
		$pull:{likes:req.user._id}
	},{
		new:true
	}).exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})
		}else{
			res.json(result)
		}
	})
})
routers.put("/comment",requireLogin,(req,res)=>{
	const comment={
		text:req.body.text,
		postedBy:req.user._id
	}
	Post.findByIdAndUpdate(req.body.postId,{
		$push:{comments:comment}

	},{
		new:true
	})
	.populate("comments.postedBy","_id name")
	.populate("postedBy","_id name")
	.exec((err,result)=>{
		if(err){
			return res.status(422).json({error:err})
		}else{
			res.json(result)
		}
	})
})
module.exports=routers