import React from 'react';
import axios from 'axios';

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const fakeRequest = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.692390,-73.914880&radius=2000&type=restaurant&key=AIzaSyByaqFNRm8cBAWr4q5C3_-D0mv355NJOaA'
        const frontReq = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        axios({method: 'get', url: `/schools/?location=${this.props.location.latitude},${this.props.location.longitude}&radius=5000&type=school&key=AIzaSyByaqFNRm8cBAWr4q5C3_-D0mv355NJOaA`, headers: { "Access-Control-Allow-Origin": '*'} })
            .then((response) => {
                console.log('request made and recieved', response)
                this.setState({
                    schoolList: response.data
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }




    render() {
        if (this.state.schoolList !== undefined) {
            const empty = '☆'
            const star = '★'
            return (
                <div>
                    {this.state.schoolList.map((school, index) => {
                        return (
                            <div key={index}>{school.name}<br></br> 
                            Rating:{school.rating} {star.repeat(Math.round(school.rating))}{empty.repeat(5-Math.round(school.rating))}</div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>please wait while we find schools</div>
            )
        }
    }
}

export default Schools