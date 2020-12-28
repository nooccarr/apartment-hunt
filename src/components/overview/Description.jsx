import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render () {
        return (
            <>
                <div className='desMain'>
                    <div className='desDetail'>
                        <div className='desAddress'>999 Unreal Ave, Brooklyn, NY, 11111</div>
                        <div className='desAptDet'>
                            <div classname='desEle1'>PRICE</div>
                            <div classname='desEle2'>BED</div>
                            <div classname='desEle3'>BATH</div>
                        </div>
                        <div className='desDes'>Description</div>
                    </div>
                    <div className='desAct'>
                        <div className='contactAgent'>Contact Agent</div>
                        <div className='subApp'>Submit Application</div>
                    </div>
                </div>
                <div className='desContainer'>
                    <div className='criteria'>Area</div>
                    <div className='criteria'>Schools</div>
                    <div className='criteria'>Dining</div>
                    <div className='criteria'>Crime</div>
                </div>
            </>
        )
    }
}

export default Description