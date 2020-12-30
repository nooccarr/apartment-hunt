import React from 'react';
import Description from './Description.jsx'
import Album from './Album.jsx';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render () {

        return (
        <div>
            <Album/>
            <Description/>
        </div>
        )
    }
}

export default Overview
