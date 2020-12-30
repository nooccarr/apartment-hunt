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
<<<<<<< HEAD
            <Navigation/>
=======
            <div className="album-container">
                <Album/>
            </div>
>>>>>>> overview
            <Description/>
        </div>
        )
    }
}

export default Overview
