import React, { useState, useEffect }  from 'react'
// import loggedUser from './sampleUser'
import axios from 'axios';
const io = require('socket.io-client');



const Texts = (props) => {
  var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};

  const socket = io('http://localhost:5000', connectionOptions);

  //Hooks--------------------------------------------------------
  const [text, setText] = useState('');
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [inRoom, setInRoom] = useState(false);
  const [chatRoom, setChatRoom] = useState(null);
  const [render, letRender] = useState(false);

  //EffectHook---------------------------------------------------
  useEffect(() => {
    
    if (!inRoom) {
      socket.emit('join room', {room: props.chatId});
      setInRoom(true)
    }
    return () => {
        socket.emit('leave room', {
          room: props.chatId
        })
      }
  }, []);
  
  useEffect(() => {
    letRender(!render)
  }, [props.chatBox]);
  
  useEffect(() => {
    props.updateConvo(receivedMessage, chatRoom)
  }, [receivedMessage]);

  useEffect(() => {
    socket.on('receive message', payload => {
      setChatRoom(payload[1])
      setReceivedMessage(payload[0])
    })
  }, []);
  
  
  function handleSubmit(e) {
    e.preventDefault();

    socket.emit('new message', {
      room: props.chatId,
      messageObj: {
        message: text,
        sender: props.loggedIn.name
    }})
    
    storeMessageObj(props.chatBox.chatId, text, props.loggedIn.name)

    setText('')
  }

  const storeMessageObj = (chatId, message, user) => {
    axios.post('/msg', {
      chatId: chatId,
      body: message,
      sender: user,
    })
  }

  return (
    <div style={
        {
        position: 'fixed',
        bottom: '0',
        backgroundColor: '#fff',
        padding: '16px 0px 0px 15px',
        right: '40px',
        border: '1px solid #000'
      }
    }>
      <div style={{display: 'flex', justifyContent:'flex-end', marginRight: '10px'}}>
        <button style={{backgroundColor:'#EFAEAA', color:'#fff', border:'1px solid #EFAEAA', borderRadius:'50%', cursor: 'pointer'}} onClick={props.exitChat}>X</button>
      </div>
      {/* {console.log('props.chatBox', props.chatBox)} */}
      <div style={{cursor:"pointer", margin:"20px 0", fontSize: '26px'}} onClick={() => {
      {console.log('hit')}
        var path = `/apartment?id=${props.chatBox.aptId}&chatId=${props.chatBox.chatId}`
        window.history.pushState({
          path: path}, '', path);        
        window.location.reload(false);
      }}>
        {props.chatBox.address}              
      </div>
      <div style={{display: 'flex', flexGrow: '1', overflow: 'auto'}}>
        <div style={{ maxHeight: '34vh', width: '31vh', marginRight: '7px' }}>
          {props.chatBox.messages.map((messageObj, index) => (
            <div 
            key={index}
            style={{margin: '1px 0', display: 'flex', flex:'column', justifyContent: `${props.loggedIn.name === messageObj.sender ? 'flex-end' : ''}`}}
            >
              {(() => { if (messageObj.sender === props.loggedIn.name) {
                return (
                  <div style={{textAlign: 'right', marginBottom:'4px'}}>
                    <div style={{overflowWrap: 'anywhere', marginLeft: '50px', borderRadius: '5px', padding: '8px', background: '#1982FC', color:'#fff'}}>{messageObj.message}</div>
                    <div style={{color: 'rgb(148 145 145)', fontWeight: '100'}}>You</div>
                  </div>
                )} else {
                  return (
                  <div style={{marginBottom:'4px'}}>
                    <div style={{overflowWrap: 'anywhere', marginRight: '50px', borderRadius: '5px', padding: '8px', border: '1px solid #d2cccc'}} className={'rounded px-2 py-1 border'}>{messageObj.message}</div>
                    <div style={{color: 'rgb(148 145 145)', fontWeight: '100'}}>{messageObj.sender}</div>
                  </div>
                  )
                }
              })()}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{margin: '0px 18px 10px 0px'}}>
          <div>
          <input
            type="text"
            required
            value={text}
            onChange={e => setText(e.target.value)}
            style={{height: '51px', resize: 'none', borderRight: 'none', border: '1px solid #000', borderRadius: '5px 0 0 5px', width: '82%', fontSize: '19px'}}
          />
          <button style={{height: '56px', border: '1px solid #EFAEAA', borderRadius: '0 5px 5px 0', color: '#fff', width: '16%', backgroundColor: '#EFAEAA', fontSize: '17px'}} type='submit'>Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Texts;
