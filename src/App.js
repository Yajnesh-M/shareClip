import './App.css';
import './components/navbar'
import React, { Component,useState,useEffect,createContext,useReducer } from 'react';
import NavBar from './components/navbar';
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signin from './components/screens/Login'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import Front from './components/screens/Front.js'
import  {initialSatate,reducer} from  './reducer/userreducer'
import { Switch } from 'react-router-dom';

const App = ()=> {
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
 
        return (
       <BrowserRouter>
         <Switch>
       <Route exact path='/Front' component={Front}/>
       <Route exact path='/Signup' component={Signup}/>
       <Route exact path='/Login' component={Signin}/>
      <div>
      <NavBar/>
      
      <Route exact path='/Home' component={Home}/>
      
      <Route exact path='/Profile' component={Profile}/>
      <Route exact path='/CreatePost' component={CreatePost}/>
      
     
      </div>
      </Switch>
    </BrowserRouter>
   
        );
    };

export default App;