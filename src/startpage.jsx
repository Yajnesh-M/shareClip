import React, { Component } from 'react';
import './sellcss.css';
import Values from './value';
export default class startpage extends Component {
   // constructor(props){
      //  super(props)
            
        // Set initial state
        state = {greeting :6}
    updateState=()=>{
        // Changing state
        this.setState({greeting :
                    this.state.greeting+1})
    }
    styles=
    {
        'box':{'background-color':'brown','width':100,'hieght':100},
        'text':{'color':'pink'}
    };
    
    set={name:'Yajnesh M'}
     array=['value1','value2'];
     
        
     

    
    render() {
        return (
            <div className="box">
             <h1>hi :{this.state.greeting}</h1>
             <button onClick={this.updateState}>hello</button>
             
            <Values  updateState={this.updateState} name={this.set.name} val={this.state.greeting}/> 
            </div>
        );
    };

}
 