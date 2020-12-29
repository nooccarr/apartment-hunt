import React from 'react';
import _ from 'underscore';

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selection: 'Photo Album',
            options: ['Photo Album','Virtual Tour','Video Tour']
        }
    }

    display (option) {
        switch (option) {
            case 'Photo Album':
                return this.carousel;
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

    carousel () {
        return <div>
            carousel condiminium
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