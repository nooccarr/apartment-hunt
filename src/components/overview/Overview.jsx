import React from 'react';
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
            this is the overview
            <Album/>
        </div>
        )
    }
}

export default Overview
