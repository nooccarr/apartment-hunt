import React from 'react';
import _ from 'underscore';
import ReactPlayer from 'react-player';

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: 'Photo Album',
            options: [],
            current: 0
        }
        if (props.details.videos.length > 0) {
            this.state.options.push('Video Tour');
        }
        if (props.details._id === "5ff49505449bf536739e212c") {
            this.state.options.push('Virtual Tour');
        }
        if (props.details.pics.length > 0) {
            this.state.options.push('Photo Album');
        }
    }


    display (option) {
        switch (option) {
            case 'Photo Album':
                return this.carousel();
            case 'Virtual Tour':
                return this.matterport();
            case 'Video Tour':
                return this.video();
        }
    }

    video () {
        return <div className="videoContainer">
            <ReactPlayer width="900px" height="500px" playing="true" controls="true"
                url={`https://hr-blue-ocean-video-file-bucket.s3.us-east-2.amazonaws.com/${this.props.details.videos[0]}`}/>
            </div>
    }

    matterport () {
        return <iframe width="900px" height="500px" frameBorder="0" allowFullScreen allow="xr-spatial-tracking"
            src="https://my.matterport.com/show/?m=d25yC39miPY"/>
    }

    shift (way, e) {
        var current = this.state.current;
        if (way === null) {
            current = Number(e.target.id);
        } else {
            if (current === 0 && !way) {
                current = this.props.details.pics.length - 1;
            } else if (current === this.props.details.pics.length - 1 && way) {
                current = 0;
            } else {
                current += way ? 1 : -1;
            }
        }
        this.setState({current: current});
        }

    carousel () {
        var j = -1;
        return <div className="carousel">
            <img className="main-image" src={this.props.details.pics[this.state.current]}/>
            <div className="arrow right" onClick={() => this.shift(true)}/>
            <div className="arrow left" onClick={() => this.shift(false)}/>
            <div className="gallery-container" style={this.props.details.pics.length < 18 ? {left: 450 - 25 * this.props.details.pics.length} : {}}>
                    {_.map(this.props.details.pics, (src) => {
                        j++;
                        return <img key={j} id={j} className="gallery-photo"
                            style={j === this.state.current ? {opacity: 1} : {}}
                            src={src} onClick={(e) => this.shift(null, e)}/>
                    })}
            </div>
        </div>
    }

    render () {
        var i = -1;
        return (
            <div className="album-container" style={{height: 555 + 50*Math.floor(this.props.details.pics.length / 18)}}>
        <div className="album">
            {_.map(this.state.options, (option) => {
                i++;
                return <a className="options" key={option} style={{right: 10 + 110 * i}}
                    onClick={() => this.setState({selection: option})}>
                        {option}
                    </a>
            })}
            {this.display(this.state.selection)}
        </div>
        </div>
        )
    }
}

export default Album;