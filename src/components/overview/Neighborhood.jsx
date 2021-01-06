import React from 'react';
import neighborhoods from './neighborhoods.js'


class Neighborhood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        console.log('from modal', this.props.location)
        return (
            <div className='neighborhood'>
                {this.props.location.neighborhoods.map((neighborhood, index) => {
                    return (
                        <div key={index}>
                            <h3 className='neighborhoodName'>{neighborhood}</h3>
                            <p className='neighborhoodDes'>{neighborhoods[`${neighborhood}`]}</p>
                        </div>
                    )
                })}
            </div>
        )}
}

export default Neighborhood