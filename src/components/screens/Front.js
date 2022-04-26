import React, { Component,useState,useContext } from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';
import '../../App.css';
const Front = ()=>{
    const history = useHistory()
    return(
        <div >
        <div  style={{display: 'flex', justifyContent: 'center',marginTop:100}}>
            <h1>Social media Management</h1>
           
        </div>
        <div style={{display: 'flex', justifyContent: 'center',marginTop:100}}>
        <button style={{marginRight:20}} className="btn #c62828 red darken-3"
        onClick={()=>{
           
            
            history.push('/Signup')
          }}
          >
            Signin
          </button>
          <button className="btn #c62828 red darken-3"
        onClick={()=>{
            history.push('/Login')
          }}
          >
            Login
          </button>
          </div>
          </div>
    )
}

export default Front;
