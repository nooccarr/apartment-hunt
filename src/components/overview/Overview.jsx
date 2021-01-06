import React from 'react';
import Description from './Description.jsx';
import Album from './Album.jsx';
import Navigation from './navigation.jsx';
import axios from 'axios';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {details: null};
    }

    componentDidMount () {
        axios(`/apt${window.location.search}`).then(({data}) => {
            this.setState({details: data});
            console.log(data);
        }).catch(() => console.log('No data'));
    }


    render () {
        return (
        <div>
            {this.state.details === null ? null : <Album details={this.state.details}/>}
            <Description/>
        </div>
        )
    }
}

export default Overview
