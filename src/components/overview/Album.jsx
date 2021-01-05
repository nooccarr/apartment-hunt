import React from 'react';
import _ from 'underscore';
import ReactPlayer from 'react-player';
import './album-styles.scss';

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: 'Photo Album',
            options: ['Photo Album','Virtual Tour','Video Tour'],
            images: [],
            current: 0
        }
    }

    componentDidMount() {
        var imgs=["https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/c642f5487c2888ba52ce47414851dd34-full.jpg","https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/c306e58c2da48890b1a16f4bd1c90909-full.jpg","https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/dbd316134027445b6c9a4ab16be79011-full.jpg"];
        imgs = imgs.concat(imgs);
        imgs = imgs.concat(imgs);
        imgs = imgs.concat(imgs);
        this.setState({images: imgs});
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
                url="https://hr-blue-ocean-video-file-bucket.s3.us-east-2.amazonaws.com/CPS+272+Queues+Tutorial.mp4"/>
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
                current = this.state.images.length - 1;
            } else if (current === this.state.images.length - 1 && way) {
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
            <img className="main-image" src={this.state.images[this.state.current]}/>
            <div className="arrow right" onClick={() => this.shift(true)}/>
            <div className="arrow left" onClick={() => this.shift(false)}/>
            <div className="gallery-container">
                    {_.map(this.state.images, (src) => {
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
            <div className="album-container" style={{height: 555 + 50*Math.floor(this.state.images.length / 18)}}>
        <div className="album">
            {_.map(this.state.options, (option) => {
                i++;
                return <a className="options" key={option} style={{left: 600 + 110 * i}}
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