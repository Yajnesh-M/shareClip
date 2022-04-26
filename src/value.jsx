import React,{Component} from 'react';
export default class value extends Component
{
  
  render()
  {
   
      return (
        <div>
          <h2>in second</h2>
          <h1>hi :{this.props.val}</h1>
         
          <button className="button" onClick={()=>{this.props.updateState()}}>{this.props.name}</button>
          </div>
        
      );
      
  }
}