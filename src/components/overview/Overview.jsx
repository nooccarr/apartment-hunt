import React from 'react';
import Description from './Description.jsx';
import Album from './Album.jsx';
import Navigation from './navigation.jsx';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        // let userLoggin = {
        //     name: 'Lonnie567',
        //     email: 'Lonnie567@gmail.com',
        //     role: 'client'
        //   }

        let userLoggin = {
            name: 'laura90',
            email: 'laura90@gmail.com',
            role: 'agent'
          }
        // {console.log('hello', this.props.user)}         
        // {console.log('hello', this.props.admin)}         
        return (
        <div>
            <Navigation userLoggin={userLoggin}/>
            <Album/>
            <Description/>
        </div>
        )
    }
}

export default Overview
