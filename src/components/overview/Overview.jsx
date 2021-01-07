import React from 'react';
import Description from './Description.jsx';
import Album from './Album.jsx';
import Navigation from './navigation.jsx';
import axios from 'axios';
import './album-styles.scss';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {details: null};
    }

    componentDidMount () {
        axios(`/apt${window.location.search}`).then(({data}) => {
            this.setState({details: data});
            console.log(data);
            console.log(window.location);
        }).catch(() => console.log('No data'));
    }


    render () {
        return (
        <div>
            {this.state.details === null ? null : <div className='detailPage'>
                <Album details={this.state.details}/>
                <Description details={this.state.details}/>
                </div>}
        </div>
        )
    }
}

export default Overview
