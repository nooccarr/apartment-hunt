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
            <div className="album-container">
                <Album/>
            </div>
            <Description/>
        </div>
        )
    }
}

export default Overview
