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

        return (
        <div>
            <Navigation/>
            <Description/>
            this is the overview
            <Album/>
        </div>
        )
    }
}

export default Overview
