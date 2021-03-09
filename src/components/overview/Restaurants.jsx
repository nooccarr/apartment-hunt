import React from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
// import googleKey from './googleApi.js'

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        // const fakeRequest = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.692390,-73.914880&radius=2000&type=restaurant&key=${googleKey}`
        const fakeRequest = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.692390,-73.914880&radius=2000&type=restaurant&key=${process.env.GOOGLE_MAP_API_KEY}`
        const frontReq = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        // axios({method: 'get', url: `/restaurants/?location=${this.props.location.position.coordinates[1]},${this.props.location.position.coordinates[0]}&radius=2000&type=restaurant&key=${googleKey}`, headers: { "Access-Control-Allow-Origin": '*'} })
        axios({method: 'get', url: `/restaurants/?location=${this.props.location.position.coordinates[1]},${this.props.location.position.coordinates[0]}&radius=2000&type=restaurant&key=${process.env.GOOGLE_MAP_API_KEY}`, headers: { "Access-Control-Allow-Origin": '*'} })
            .then((response) => {
                console.log('request made and recieved', response)
                this.setState({
                    restaurantList: response.data
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }


    render() {
        if (this.state.restaurantList !== undefined) {
            return (
                <div>
                    {this.state.restaurantList.map((restaurant, index) => {
                        const money = '$'
                        const empty = '☆'
                        const star = '★'
                        return (
                            <div key={index} className='singleSchool'>
                                <p className='placeName'>{restaurant.name}</p> <br></br>
                                <img src={restaurant.photos === undefined ?
                                    // 'https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg' : `https://maps.googleapis.com/maps/api/place/photo?maxheight=100&photoreference=${restaurant.photos[0].photo_reference}&key=${googleKey}`}
                                    'https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg' : `https://maps.googleapis.com/maps/api/place/photo?maxheight=100&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.GOOGLE_MAP_API_KEY}`}
                                    className='modalImage'>
                                </img><br></br>
                                <b>Price Level:</b> {money.repeat(restaurant.price_level)} <br></br>
                                <b>Rating:</b> {restaurant.rating} {star.repeat(Math.round(restaurant.rating))}{empty.repeat(5-Math.round(restaurant.rating))}<br></br>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className='restaurantList'>
                    Please wait while we find restaurants
                </div>
            )
        }
    }
}


export default Restaurants