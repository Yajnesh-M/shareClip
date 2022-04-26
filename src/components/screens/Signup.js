import React, { Component,useState } from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';

const Signup = ()=>{
    const history=useHistory();
    const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setpassword]=useState("");
  const PostData=()=>
  {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
         {M.toast({html: "Invalied Email", classes: 'rounded',classes:'#f44336 red'});}
    }
    fetch("/signup",
    {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    }).then(res=>res.json()).then(data=>{
          if(data.error)
            {M.toast({html: data.error, classes: 'rounded',classes:'#f44336 red'});}
        else
        {
            M.toast({html: data.message, classes: 'rounded',classes:'#388e3c green darken-2'});
            history.push('/Login');
        }
    })
  }
    return(
        
    <div className="mycard">
        <div className="row">
                <div className="col s12 m6">
                    <div className="authcard">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                                <center>x<h2>shareclips</h2></center>
                                <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                <input type="password" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                                <button className="btn waves-effect waves-light" onClick={()=>PostData()} >Signup
                            </button>
                           
                            <h5>
                                <Link to="/login">Already Have Account?</Link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )
}

export default Signup;
