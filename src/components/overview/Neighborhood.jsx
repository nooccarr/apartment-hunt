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
                    var trueName = neighborhood.split(' ')
                    var final = ''
                    for (var i =0; i < trueName.length; i++) {
                        final = final + trueName[i].charAt(0).toUpperCase() + trueName[i].slice(1) + ' '
                    }
                    if (neighborhoods[`${neighborhood.toLowerCase()}`] === undefined) {
                        return null
                    } else {
                    return (
                        <div key={index}>
                            <h3 className='neighborhoodName'>{final}</h3>
                            <p className='neighborhoodDes'>{neighborhoods[`${neighborhood.toLowerCase()}`]}</p>
                        </div>
                    )}
                })}
            </div>
        )}
}

export default Neighborhood