import React, { Component,useState,useContext } from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';

const Login = ()=>{
    const history=useHistory();
    
  const [email,setEmail]=useState("");
  const [password,setpassword]=useState("");
 
  const PostData=()=>
  {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
         {M.toast({html: "Invalied Email", classes: 'rounded',classes:'#f44336 red'});}
    }
    fetch("/signin",
    {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
           
            email,
            password
        })
    }).then(res=>res.json()).then(data=>{
        console.log(data);
          if(data.error)
            {M.toast({html: data.error, classes: 'rounded',classes:'#f44336 red'});}
        else
        {
            localStorage.setItem("jwt",data.token)
             localStorage.setItem("user",JSON.stringify(data.user))
            
            M.toast({html: "Signed In Successfully", classes: 'rounded',classes:'#388e3c green darken-2'});
            history.push('/Home');
        }
    })
  }


    return(
        <div className="mycard">
            <div class="row">
                    <div class="col s12 m6">
                        <div className="authcard">
                        <div class="card blue-grey darken-1">
                            <div className="card-content white-text">
                                    <center>x<h2>shareclips</h2></center>
                                    <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                    <input type="password" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                                    <button class="btn waves-effect waves-light" onClick={()=>PostData()}>Login
                                    
                                    </button>
                                <h5>
                                <Link to="/signup"> Dont Have An Account?</Link>
                                </h5>

                            </div>
                        </div>
                    </div>
              </div>
         </div>

        </div>
    )
}

export default Login;
