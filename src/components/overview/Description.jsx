import React from 'react';
import sampleApts from './sampleData';
import Restaurants from './Restaurants.jsx';
import Schools from './Schools.jsx';
import FileUploadOverlay from '../FileUpload/FileUploadOverlay.jsx';
import './detail.style.scss';
import CrimeMap from './CrimeMap.jsx'
import Neighborhood from './Neighborhood.jsx'
import axios from 'axios';
import Texts from '../ChatBox/frontend/Texts.jsx';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaModal: false,
            diningModal: false,
            schoolsModal: false,
            chatHist: [],
            idx: null,
            chatId: null,
            // texts: false,
        }
        this.contactAge = this.contactAge.bind(this)
        this.exitChat = this.exitChat.bind(this)
        this.updateConvo = this.updateConvo.bind(this)
    }


    exitChat() {
        // this.setState({
        //     texts: false
        // })
        this.props.switchChat(null)
    }

    updateConvo(messageObj, chatRoomId) {
        if (chatRoomId === null) {
          return;
        }
        
        let outdatedChat = [...this.state.chatHist];
        for (let i = 0; i < outdatedChat.length; i++) {
          if (outdatedChat[i].chatId === chatRoomId) {
            let chatRoom = outdatedChat[i]
            chatRoom.messages.push(messageObj)
            this.setState(
                {
                    chatHist: outdatedChat
                }
            )
          }
        }
      }

    contactAge() {
        return axios.post('/chatRoom', {
            aptId: this.props.details._id,
            address: this.props.details.address,
            userName: this.props.user.name,
            userEmail: this.props.user.email,
            agentName: this.props.details.agent,
            agentEmail: this.props.details.email,
            messages: [],
        }).then(() => {
            return axios.get(`/msg/client`, {
                params: {
                    userEmail: this.props.user.email
                }
            })
        }).then(({ data }) => {
            this.setState({
                chatHist: data
            })
        })
    }
        
    componentDidUpdate(prevProps, prevState) {
        if (prevState.chatHist !== this.state.chatHist) {
            console.log('chatHist state has changed.')
            this.getChatRoom()
        } 
        // else if (prevState.chatId !== this.state.chatId) {
        //     // console.log('idx state has changed.', prevState.chatId)
        //     console.log('idx state has changed.', this.state.idx)
        //     console.log('chatHist state has changed.', this.state.chatHist)
        //     console.log('new chatId state has changed.', this.state.chatId)
        //     this.props.switchChat('conAge')
        // }
    }
    
    getChatRoom() {
        return axios.get('/chatRoom', { 
            params: {
                address: this.props.details.address,
                userName: this.props.user.name,
            }
        }).then(({ data }) => {
            // console.log('chatHist', this.state.chatHist)
            // console.log('this.state.chatHist[i].chatId', this.state.chatHist)
            // console.log('data[0].chatId', data[0])
            for (let i = 0; i < this.state.chatHist.length; i++) {
                if (this.state.chatHist[i].chatId === data[0].chatId) {
                    this.setState({
                        idx: i,
                        chatId: data[0].chatId,
                        // texts: true,
                    })
                }
            }
            this.props.switchChat('conAge')
        })
    }






    areaModal () {
        if (this.state.areaModal === true){
            return (
                <div id="areaModal" className="modal">
                    <div className="modal-content3">
                        <span className="close" onClick={() => {this.flipAreaModal()}}>&times;</span>
                        <Neighborhood location={this.props.details}/>
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
                        <Restaurants location={this.props.details}/>
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
                        <Schools location={this.props.details}/>
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
                    <div className="modal-content2">
                        <span className="close" onClick={() => {this.flipCrimeModal()}}>&times;</span>
                        <CrimeMap location={this.props.details}/>
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
                        <div className='desHeader'>
                        <div className='desAddress'>
                            {this.props.details.address}, {this.props.details.city}, {this.props.details.state}, {this.props.details.zipCode}
                            </div>
                    <div className='desAct'>
                        {this.props.user.role === 'client' ? 
                        <div onClick={this.contactAge} className='contactAgent'>Contact Agent</div> :
                        null}
                        <FileUploadOverlay username={this.state.username} apartment_id={this.props.details._id} />
                    </div>
                        <div className='desAptDet'>
                            <div className='desEle1'>${this.props.details.price}/Month</div>
                            <div className='desEle2'>Bedrooms:{this.props.details.beds}</div>
                            <div className='desEle3'>Bathrooms:{this.props.details.baths}</div>
                        </div>
                        </div>
                        <div className='desTail'>
                        <div className='desDes'>{this.props.details.description}</div>
                <div className='desContainer'>
                    <img src='./neighborhood.png' style={{top:20, left:20}} className='criteria' onClick={() => {this.flipAreaModal()}}></img>
                    <img src='./schools.png' style={{top:20, left:160}} className='criteria' onClick={() => {this.flipSchoolsModal()}}></img>
                    <img src='./restaurants.png' style={{top:160, left:20}} className='criteria' onClick={() => {this.flipDiningModal()}}></img>
                    <img src='./crime.png' style={{top:160, left:160}} className='criteria' onClick={() => {this.flipCrimeModal()}}></img>
                </div>
                </div>
                    </div>
                </div>
                {this.areaModal()}
                {this.diningModal()}
                {this.schoolsModal()}
                {this.crimeModal()}
                {this.props.texts === 'conAge' ? <Texts chatBox={this.state.chatHist[this.state.idx]} updateConvo={this.updateConvo} chatId={this.state.chatId} loggedIn={this.props.user} exitChat={this.exitChat}/> : null}
            </>
        )
    }
}

export default Description