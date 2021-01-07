import React, { useState, useEffect } from 'react';
import Convos from './Convos.jsx';
// import sampleChatData from './sampleChatData.js';
import Texts from './Texts.jsx';
import loggedUser from './sampleUser';
import axios from 'axios';

const ChatApp = (props) => {
  
  const [chatIdx, setChatIdx] = useState(null);
  const [chatHist, setChatHist] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [firstRender, setFirstRender] = useState(false);
  const [textUpdate, getTextUpdate] = useState(false);
  const [currChatRoom, getCurrChatRoom] = useState({});

  const selectConvo = (id) => {
    setChatIdx(id);
    setChatId(chatHist[id].chatId);
    // setConvos(false);
    props.shutConvo()
    // setTexts(true);
    getTextUpdate(true);
    props.switchChat('nav')
  }

  const exitChat = () => {
    // setTexts(false)
    getTextUpdate(false)
    props.switchChat(null)
  }

  useEffect(() => {
    console.log('props', props)
    if (props.user.hasOwnProperty('email')) {
      console.log('props.user', props.user)
      return axios
        .get(`/msg/client`, {
          params: {
            userEmail: props.user.email,
          },
        }).then(({ data }) => {
          setChatHist(data)
        })
    }
  }, [textUpdate, props.user])


  // useEffect(() => {
  //   if (props.texts === 'alt') {
  //     getTextUpdate(true);
  //   }
  // }, [])

  useEffect(() => {
    console.log('chatHist', chatHist)
    console.log('props.chatKey', props.chatKey)
    if (chatHist.length > 0) {
      for (let i = 0; i < chatHist.length; i++) {
        if (chatHist[i].chatId === props.chatKey) {
          getCurrChatRoom(chatHist[i])
        }
      }
      if (props.chatKey) {
        props.switchChat('alt');
      }
    }
  }, [chatHist])

  ////////////////////////////Keep all socket connection/////////////
  // useEffect(() => {
  //   if (!inRoom) {
  //     setInRoom(true)
  //     for (let i = 0; i < chatHist.length; i++) {
  //       socket.emit('join room', {room: chatHist[i].chatId});
  //     }
  //   }
  //   // return () => {
  //   //   socket.emit('leave room', {
  //   //     room: props.chatId
  //   //   })
  //   // }
  // }, [chatHist])

  /////////////////////////////////////////////////////////////////

  const updateConvo = (messageObj, chatRoomId) => {
    if (chatRoomId === null) {
      return;
    }

    let outdatedChat = [...chatHist];
    for (let i = 0; i < outdatedChat.length; i++) {
      if (outdatedChat[i].chatId === chatRoomId) {
        let chatRoom = outdatedChat[i];
        chatRoom.messages.push(messageObj);
        setChatHist(outdatedChat);
      }
    }
  };
    
  
  return (
    <div>
      {console.log('props.convos', props.convos)}
      <div>
        {props.convos ? <Convos chatHistory={chatHist} selectConvo={selectConvo} /> : null}
        {props.texts === 'nav' ? <Texts chatBox={chatHist[chatIdx]} exitChat={exitChat} updateConvo={updateConvo} chatId={chatId} loggedIn={props.user}/> : null}
        {props.texts === 'alt' ? <Texts chatBox={currChatRoom} exitChat={exitChat} updateConvo={updateConvo} chatId={chatId} loggedIn={props.user}/> : null}
      </div>
    </div>
  );
};

export default ChatApp;

