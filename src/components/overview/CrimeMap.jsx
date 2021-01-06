import React from 'react';
import googleKey from './googleApi.js'

class CrimeMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const scriptTag = document.getElementById('crimeometer-google-maps-control-v2')
        scriptTag.setAttribute('data-lon', this.props.location.longitude)
        scriptTag.setAttribute('data-lat', this.props.location.latitude)
        crimeometer_map()
        // var script = document.createElement('script');
        // script['data-xak']='TgHCbQ0Zv41lfemssPwQk1xI82q3PM5Q8bZsrwfX'
        // script.setAttribute('data-xak', 'TgHCbQ0Zv41lfemssPwQk1xI82q3PM5Q8bZsrwfX')
        // script['data-zoom'] = '15'
        // script.setAttribute('data-zoom','15')
        // script['data-lat']= `${this.props.location.latitude}`
        // script.setAttribute('data-lat', `${this.props.location.latitude}`)
        // script['data-lon']= `${this.props.location.longitude}`
        // script.setAttribute('data-lon',`${this.props.location.longitude}`)
        // script['data-distance']= '2mi'
        // script.setAttribute('data-distance', '2mi')
        // script['data-datetime-ini']= '2020-01-01 00:00:00'
        // script.setAttribute('data-datetime-ini','2020-01-01 00:00:00')
        // script['data-datetime-end']= '2020-11-24 00:00:00'
        // script.setAttribute('data-datetime-end', '2020-11-24 00:00:00')
        // script['data-max-incidents']= '500'
        // script.setAttribute('data-max-incidents', '500')
        // cript.src = 'https:dvk.crimeometer.com/crimeometer-google-maps-control-v2.js'

        // var scriptTwo = document.createElement('script')
        // scriptTwo.src= `https://maps.googleapis.com/maps/api/js?key=${googleKey}&callback=crimeometer_map`

        // console.log('what we are looking for', document.getElementById('crime-map'))
        // document.getElementById('crimeometer-container').appendChild(script)
        // document.getElementById('crimeometer-container').appendChild(scriptTwo)
    }


    render() {
        // var script = document.createElement('script');
        // script.src = 'https:dvk.crimeometer.com/crimeometer-google-maps-control-v2.js'
        // script['data-xak']='TgHCbQ0Zv41lfemssPwQk1xI82q3PM5Q8bZsrwfX'
        // script['data-zoom'] = '15'
        // script['data-lat']= `${this.props.location.latitude}`
        // script['data-lon']= `${this.props.location.longitude}`
        // script['data-distance']= '2mi'
        // script['data-datetime-ini']= '2020-01-01 00:00:00'
        // script['data-datetime-end']= '2020-11-24 00:00:00'
        // script['data-max-incidents']= '500'

        // var scriptTwo = document.createElement('script')
        // scriptTwo.src= `https://maps.googleapis.com/maps/api/js?key=${googleKey}&callback=crimeometer_map`

        // console.log('what we are looking for', document.getElementById('crime-map'))
        // document.body.appendChild(document.getElementById('crime-map'))
        // document.body.appendChild(document.getElementById('crime-map'))

        return (
            <div>
                <div id='crimeometer-container' style=
                {{
                    height: '600px',
                    width: '800px',
                    margin: '10px',
                    color: 'pink'
                }}
                // 'height:600px; width:800px margin:10px border:2px solid; border-color:rgba(100,100,100,.7); border-radius:4px;'
                >
                    <div id='crime-map' style=
                    {{
                        height: '80%',
                        width: '80%'
                    }}
                    // 'height:100%; width:100%;'
                    ></div>
                     The drop pins represent crimes that have been committed within the past year, click them to see the type of incident.
                </div>
            </div>
        )
    }
}



export default CrimeMap