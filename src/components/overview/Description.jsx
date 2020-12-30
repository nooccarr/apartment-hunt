import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaModal: false,
            diningModal: false,
            schoolsModal: false
        }
    }

    areaModal () {
        if (this.state.areaModal === true){
            return (
                <div id="areaModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => {this.flipAreaModal()}}>&times;</span>
                        <p>blurb about neighborhood</p>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    flipAreaModal () {
        if (this.state.areaModal === true) {
            this.setState({
                areaModal: false,
                diningModal: this.state.diningModal,
                schoolsModal: this.state.schoolsModal,
                crimeModal: this.state.crimeModal
            })
        } else {
            this.setState({
                areaModal: true,
                diningModal: this.state.diningModal,
                schoolsModal: this.state.schoolsModal,
                crimeModal: this.state.crimeModal
            })
        }
    }

    diningModal () {
        if (this.state.diningModal === true){
            return (
                <div id="diningModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => {this.flipDiningModal()}}>&times;</span>
                        <p>List of dining options...</p>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    flipDiningModal () {
        if (this.state.diningModal === true) {
            this.setState({
                areaModal: this.state.areaModal,
                diningModal: false,
                schoolsModal: this.state.schoolsModal,
                crimeModal: this.state.crimeModal
            })
        } else {
            this.setState({
                areaModal: this.state.areaModal,
                diningModal: true,
                schoolsModal: this.state.schoolsModal,
                crimeModal: this.state.crimeModal
            })
        }
    }

    schoolsModal () {
        if (this.state.schoolsModal === true){
            return (
                <div id="schoolsModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => {this.flipSchoolsModal()}}>&times;</span>
                        <p>info about schools in the area</p>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    flipSchoolsModal () {
        if (this.state.schoolsModal === true) {
            this.setState({
                areaModal: this.state.areaModal,
                diningModal: this.state.diningModal,
                schoolsModal: false,
                crimeModal: this.state.crimeModal
            })
        } else {
            this.setState({
                areaModal: this.state.areaModal,
                diningModal: this.state.diningModal,
                schoolsModal:true,
                crimeModal: this.state.crimeModal
            })
        }
    }

    crimeModal () {
        if (this.state.crimeModal === true){
            return (
                <div id="crimeModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => {this.flipCrimeModal()}}>&times;</span>
                        <p>Hopefully a map displaying crimes in the area</p>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    flipCrimeModal () {
        if (this.state.crimeModal === true) {
            this.setState({
                areaModal: this.state.areaModal,
                diningModal: this.state.diningModal,
                schoolsModal: this.state.schoolsModal,
                crimeModal: false
            })
        } else {
            this.setState({
                areaModal: this.state.areaModal,
                diningModal: this.state.diningModal,
                schoolsModal:this.state.schoolsModal,
                crimeModal: true
            })
        }
    }

    render () {
        return (
            <>
                <div className='desMain'>
                    <div className='desDetail'>
                        <div className='desAddress'>999 Unreal Ave, Brooklyn, NY, 11111</div>
                        <div className='desAptDet'>
                            <div className='desEle1'>PRICE</div>
                            <div className='desEle2'>BED</div>
                            <div className='desEle3'>BATH</div>
                        </div>
                        <div className='desDes'>Description</div>
                    </div>
                    <div className='desAct'>
                        <div className='contactAgent'>Contact Agent</div>
                        <div className='subApp'>Submit Application</div>
                    </div>
                </div>
                <div className='desContainer'>
                    <div className='criteria' onClick={() => {this.flipAreaModal()}}>Area</div>
                    <div className='criteria' onClick={() => {this.flipSchoolsModal()}}>Schools</div>
                    <div className='criteria' onClick={() => {this.flipDiningModal()}}>Dining</div>
                    <div className='criteria' onClick={() => {this.flipCrimeModal()}}>Crime</div>
                </div>
                {this.areaModal()}
                {this.diningModal()}
                {this.schoolsModal()}
                {this.crimeModal()}
            </>
        )
    }
}

export default Description