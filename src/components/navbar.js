import React from 'react'
import '../App.css';
import {Link,useHistory} from 'react-router-dom'
const NavBar = ()=>{
  const history = useHistory()
  
    return(
        <nav id='sticky'>
        <div class="nav-wrapper ">
          <Link to="/Home" class="brand-logo left"><i><b>shareclips</b></i></Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
              <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <li><Link to="/Home">Home</Link></li>
           
            <li><Link to="/Profile">profile</Link></li>
            <li><Link to="/CreatePost">CreatePOst</Link></li>
            <li>
              <button className="btn #c62828 red darken-3"
            onClick={()=>{
                localStorage.clear()
                
                history.push('/Login')
              }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

    )
}

export default NavBar