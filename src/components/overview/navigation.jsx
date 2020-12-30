import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render () {
 
        return (
      <div className="navheader">
        <div className="header" id="home">
       
        
          <div className="header_top">
            <div className="wrap">
            <div className="col-1-3">
                <div className="logo">
                    <a href="index.html"><img src={logo} /></a>
                </div>	
            </div>
            

              <div className="search-bar">
                <div className="col-2-3">  
                <div className="menu">
                  <ul>
                    <li><a href="findapt" className="scroll">Find Apartments</a></li>
                    <li><Link to="aboutus" className="scroll">About Us</Link></li>	
                    
                    <li className="chatButton" >
                      <div id="chatButton"><a href="#" id="chatButton"><span>Chat Button</span></a></div>
                    </li>		    
                    <li className="login" >
                      <div id="loginContainer"><a href="#" id="loginButton"><span>Login</span></a></div>
                    </li>
                
                  </ul>
                </div>
                <div className="search-form">
                  <form method="get" action="/homelist" id="search" className="f-right">
                    <input name="query" className="search-input" type="text" size="40" placeholder="Try to find your apartment" />
                    <button type="submit" className="searchButton"> Search</button>
                  </form>
                </div>
              </div>
            </div>
            							
          </div>
        </div>
      </div>
    </div>
        )
    }
}

export default Navigation;
