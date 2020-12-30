import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Overview from './overview/Overview.jsx'
import About from './overview/aboutus.jsx';
import '../../dist/styles/styles.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render () {
    return (
    <Router>
      <Switch>
        <Route  path="/aboutus">
          <About/>
        </Route>
        <Route path="/">
          <Overview/>
        </Route>  
      </Switch>
    </Router>
      /* {<div>
        I love <span className='pink'>pink!</span>
        I love my dog teddy!
        <Overview/>
      </div>} */
      
    )

  }
}



export default App;