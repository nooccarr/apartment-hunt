import React from 'react'
import Overview from './overview/Overview.jsx'


class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render () {
    return (
      <div>
        I love <span className='pink'>pink!</span>
        I love my dog teddy!
        <Overview/>
      </div>
    )

  }
}



export default App;