import React from 'react';

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        
    }


    render() {
        return (
            <div className='restaurantList'>
                {this.props.location.address}
            </div>
        )
    }
}


export default Restaurants