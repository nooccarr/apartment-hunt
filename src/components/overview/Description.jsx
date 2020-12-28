import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render () {
        return (
            <div className='description'>
                <div className='desMain'>
                    <div className='desDetail'>tbd</div>
                    <div className='desAct'>tbd</div>
                </div>
                <div className='desContainer'>
                    <div className='criteria'>Area</div>
                    <div className='criteria'>Schools</div>
                    <div className='criteria'>Dining</div>
                    <div className='criteria'>Crime</div>
                </div>
            </div>
        )
    }
}

export default Description