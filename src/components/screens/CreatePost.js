import React, { Component,useState,useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';

const CreatePost = ()=>{
    const history=useHistory();
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
  const [body,setBody]=useState("");
  const [url,setUrl]=useState("");
useEffect(()=>{
if(url){
    fetch("/createpost",
    {
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            body,
            pic:url
        })
    }).then(res=>res.json()).then(data=>{
          if(data.error)
            {M.toast({html: data.error, classes: 'rounded',classes:'#f44336 red'});}
        else
        {
           M.toast({html: "Uploaded successfully", classes: 'rounded',classes:'#388e3c green darken-2'});
             history.push('/Home');
        }
    })
}
},[url])
  const PostData=()=>
  {
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","shareclip")
    data.append("cloud_name","shareclip")
    fetch("https://api.cloudinary.com/v1_1/shareclip/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        setUrl(data.url)
    })
  

    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    // {
    //      {M.toast({html: "Invalied Email", classes: 'rounded',classes:'#f44336 red'});}
    // }
    
  }
    return(
        <div>
            <div style={{display:"flex",margin:"80px"}}></div>
    <div className="card input-filed"
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"}} >
           
        <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <input type="text" placeholder="Body" value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file"  onChange={(e)=>{setImage(e.target.files[0])}}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div> 
              
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1 "   onClick={()=>PostData()}>Submit post</button>

    </div>

    </div>
    )









}
export default CreatePost