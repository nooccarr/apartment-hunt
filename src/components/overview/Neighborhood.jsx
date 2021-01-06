import React from 'react';
import neighborhoods from './neighborhoods.js'


class Neighborhood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div className='neighborhood'>
                <h3 className='neighborhoodName'>Bushwick</h3>
                <p className='neighborhoodDes'>{neighborhoods.Bushwick}</p>
            </div>
        )
    }
}

export default Neighborhood