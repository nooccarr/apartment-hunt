import React, { useState, useEffect }  from 'react'
import loggedUser from './sampleUser'
import { Form, InputGroup, Button } from 'react-bootstrap'
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
      console.log('joining room');
      console.log('roomId', props.chatId);
      socket.emit('join room', {room: props.chatId});
      setInRoom(true)
    }
    return () => {
      console.log('leaving room');
      // setInRoom(false)
        socket.emit('leave room', {
          room: props.chatId
        })
      }
  }, []);
  
  useEffect(() => {
    props.updateConvo(receivedMessage, chatRoom)
  }, [receivedMessage]);

  useEffect(() => {
    // console.log('render', firstRender)
    // if (firstRender) {
    //   setFirstRender(false)
    // } else {
    socket.on('receive message', payload => {
      console.log('payload', payload)
      setChatRoom(payload[1])
      setReceivedMessage(payload[0])
    })
    // }
  }, []);
  
  
  function handleSubmit(e) {
    e.preventDefault();

    // sendMessage()
    console.log('loggedUser', loggedUser)
    socket.emit('new message', {
      room: props.chatId,
      messageObj: {
        message: text,
        sender: loggedUser
    }})
    
    // props.updateConvo(
    //   {
    //     message: text,
    //     sender: loggedUser,
    //     // createdAt: 
    //   } 
    // )
    setText('')
  }

  return (
    <div style={
        {
        position: 'fixed',
        bottom: '0',
        backgroundColor: '#fff',
        padding: '25px',
        paddingBottom: '0',
        left: '70%'
      }
    }>
      <button onClick={props.exitChat}>X</button>
      <div>{props.chatBox.address}</div>
      <div className='d-flex flex-grow-1 overflow-auto'>
        <div>
          {console.log('chatBox', props.chatBox)}
          {props.chatBox.messages.map((messageObj, index) => (
          <div 
            key={index}
            className={`my-1 d-flex flex-column ${loggedUser === messageObj.sender ? 'align-items-end' : 'align-items-start'} justified-content-end`}>
              {(() => { if (messageObj.sender === loggedUser) {
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
        <Form.Group style={{marginBottom: '10px'}}>
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
