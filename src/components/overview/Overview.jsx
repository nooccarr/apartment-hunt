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
        <div style={{backgroundColor: 'white'}}>
            {/* <Navigation/> */}
            <Album />
            <Description/>
        </div>
        )
    }
}

export default Overview
