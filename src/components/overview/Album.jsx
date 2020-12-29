import React from 'react';
import _ from 'underscore';

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: 'Photo Album',
            options: ['Photo Album','Virtual Tour','Video Tour'],
            images: [],
            liftGallery: '',
            galleryTop: 0,
            galleryLift: 0,
            current: 0
        }
    }

    componentDidMount() {
        var imgs=["https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/c642f5487c2888ba52ce47414851dd34-full.jpg","https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/c306e58c2da48890b1a16f4bd1c90909-full.jpg","https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/dbd316134027445b6c9a4ab16be79011-full.jpg"];
        imgs = imgs.concat(imgs);
        imgs = imgs.concat(imgs);
        imgs = imgs.concat(imgs);
        var lift = imgs.length > 10 ? 60 : 0;
        this.setState({images: imgs, galleryTop: lift, galleryLift: lift});
    }

    display (option) {
        switch (option) {
            case 'Photo Album':
                return this.carousel();
            case 'Virtual Tour':
                return this.matterport();
            case 'Video Tour':
                return null;
        }
    }

    matterport () {
        return <iframe width="700" height="450" frameBorder="0" allowFullScreen allow="xr-spatial-tracking"
        src="https://my.matterport.com/show/?m=d25yC39miPY"></iframe>
    }

    shift (way, e) {
        var current = this.state.current;
        if (way === null) {
            console.log('shifting to ', e.target.id);
            current = Number(e.target.id);
        } else {
            console.log('shifting', way ? 'right' : 'left');
            if (current === 0 && !way) {
                current = this.state.images.length - 1;
            } else if (current === this.state.images.length - 1 && way) {
                current = 0;
            } else {
                current += way ? 1 : -1;
            }
        }
        console.log(current);
        this.setState({current: current});
        }

    carousel () {
        var j = -1;
        return <div className="carousel">
            <img className="main-image" src={this.state.images[this.state.current]}/>
            <div className="arrow right" onClick={() => this.shift(true)}/>
            <div className="arrow left" onClick={() => this.shift(false)}/>
            <div className="gallery-container"
                style={{top: 390 - this.state.galleryTop,
                        height: 60 + this.state.galleryTop}}
                onMouseEnter={this.state.galleryLift === this.state.galleryTop ? 
                    () => this.setState({liftGallery: ' lift'}) : null}
                onMouseLeave={this.state.galleryLift === 0 ?
                    () => this.setState({liftGallery: ' drop'}): null}
                onAnimationEnd={() => this.setState({
                    galleryLift: this.state.liftGallery === ' lift' ? 0 : this.state.galleryTop,
                    liftGallery: ''})}>
                <div className={`gallery-carousel${this.state.liftGallery}`} style={this.state.images.length < 11 ? 
                    {left: 300 - 30 * this.state.images.length} : {top: this.state.galleryLift, left: 0, width: 600}}>
                    {_.map(this.state.images, (src) => {
                        j++;
                        return <img key={j} id={j} className="gallery-photo"
                            src={src} onClick={(e) => this.shift(null, e)}/>
                    })}
                </div>
            </div>
        </div>
    }

    render () {
        var i = -1;
        return (
        <div className="album">
            {_.map(this.state.options, (option) => {
                i++;
                return <a className="options" key={option} style={{left: 400 + 110 * i}}
                    onClick={() => this.setState({selection: option})}>
                        {option}
                    </a>
            })}
            {this.display(this.state.selection)}
        </div>
        )
    }
}

export default Album;