import React, { useState, useEffect, useCallback }  from 'react';
import axios from 'axios';
// import loggedUser from './sampleUser'

const io = require('socket.io-client');



const Texts = (props) => {
  var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "10", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000, //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};

  // const socket = io('http://18.224.228.145:80', connectionOptions);
  const socket = io('http://127.0.0.1:5000', connectionOptions);

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

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      backgroundColor: '#fff',
      padding: '10px',
      right: '40px',
      border: '3px solid #efaeaa',
      borderRadius: '5px',
      cursor: 'default'
    }}>
      <div style={{
        display: 'flex',
        justifyContent:'flex-end'
      }}>
        <button
          style={{
            backgroundColor:'#efaeaa',
            color:'#fff',
            border:'1px solid #efaeaa',
            borderRadius:'50%',
            cursor: 'pointer'
          }}
          onClick={props.exitChat}
        >X</button>
      </div>
      <div
        style={{
          marginBottom:'10px',
          paddingBottom: '20px',
          borderBottom: '1px solid #efaeaa',
          textAlign: 'center',
          fontSize: '26px',
          color: '#bf6368',
          cursor: 'pointer'
        }}
        onClick={() => {
          var path = `/apartment?id=${props.chatBox.aptId}&chatId=${props.chatBox.chatId}`;
          window.history.pushState({ path: path }, '', path);
          window.location.reload(false);
      }}>
        {props.chatBox.address}
      </div>
      <div style={{
        display: 'flex',
        flexGrow: '1',
        overflow: 'auto'
      }}>
        <div style={{
          maxHeight: '300px',
          width: '300px',
          marginRight: '16px'
        }}>
          {props.chatBox.messages.map((messageObj, index) => {
            const lastMessage = props.chatBox.messages.length - 1 === index;
            return (<div
              key={index}
              style={{
                margin: '1px 0',
                display: 'flex',
                flex:'column',
                justifyContent: `${props.loggedIn.name === messageObj.sender ? 'flex-end' : ''}`
              }}
              ref={lastMessage ? setRef : null}
            >
              {(() => { if (messageObj.sender === props.loggedIn.name) {
                return (
                  <div style={{
                    textAlign: 'right',
                    marginBottom:'4px'
                  }}>
                    <div style={{
                      overflowWrap: 'anywhere',
                      marginLeft: '50px',
                      borderRadius: '5px',
                      padding: '8px',
                      background: 'rgb(236 130 142)',
                      color:'#fff'
                    }}>{messageObj.message}</div>
                    <div style={{
                      color: 'rgb(148 145 145)',
                      fontWeight: '100'
                    }}>You</div>
                  </div>
                )} else {
                  return (
                  <div style={{ marginBottom:'4px' }}>
                    <div style={{
                      overflowWrap: 'anywhere',
                      marginRight: '50px',
                      borderRadius: '5px',
                      padding: '8px',
                      border: '1px solid rgb(255 173 182)'
                    }}>{messageObj.message}</div>
                    <div style={{
                      color: 'rgb(148 145 145)',
                      fontWeight: '100'
                    }}>{messageObj.sender}</div>
                  </div>
                )}
              })()}
            </div>);
          })}
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
            style={{
              height: '51px',
              resize: 'none',
              borderRight: 'none',
              border: '1px solid darkgray',
              borderRadius: '5px 0 0 5px',
              width: '70%',
              fontSize: '19px'
            }}
          />
          <button
            style={{
              height: '56px',
              border: '1px solid #efaeaa',
              borderRadius: '0 5px 5px 0',
              color: '#fff',
              width: '27%',
              backgroundColor: '#efaeaa',
              fontSize: '17px',
              cursor: 'pointer'
            }}
            type='submit'
          >Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Texts;