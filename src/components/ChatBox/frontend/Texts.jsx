import React, { useState, useEffect }  from 'react'
// import loggedUser from './sampleUser'
import { Form, InputGroup, Button } from 'react-bootstrap'
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
        sender: props.loggedIn.user
    }})
    
    storeMessageObj(props.chatBox.chatId, text, props.loggedIn.user)

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
        right: '40px'
      }
    }>
      <button onClick={props.exitChat}>X</button>
      <div>{props.chatBox.address}</div>
      <div className='d-flex flex-grow-1 overflow-auto'>
        <div style={{ maxHeight: '34vh', width: '24vh', marginRight: '7px' }}>
          {props.chatBox.messages.map((messageObj, index) => (
          <div 
            key={index}
            className={`my-1 d-flex flex-column ${props.loggedIn.user === messageObj.sender ? 'align-items-end' : 'align-items-start'} justified-content-end`}>
              {(() => { if (messageObj.sender === props.loggedIn.user) {
                return (
                  <div className="text-right">
                    <div className={'rounded px-2 py-1 bg-primary text-white'}>{messageObj.message}</div>
                    <div className={'text-muted small'}>You</div>
                  </div>
                )} else {
                  return (
                  <div>
                    <div className={'rounded px-2 py-1 border'}>{messageObj.message}</div>
                    <div className={'text-muted small'}>{messageObj.sender}</div>
                  </div>
                  )
                }
              })()}
            </div>
          ))}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{margin: '0px 18px 10px 0px'}}>
          <InputGroup>
          <Form.Control
            as="textarea"
            required
            value={text}
            onChange={e => setText(e.target.value)}
            style={{height: '50px', resize: 'none'}}
          />
          <InputGroup.Append>
            <Button type='submit'>Send</Button>
          </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Texts;
