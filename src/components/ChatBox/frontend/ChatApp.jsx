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
  const [render, setRender] = useState(false);

  const selectConvo = (id) => {
    setChatIdx(id);
    setChatId(chatHist[id].chatId);
    // setConvos(false);
    getTextUpdate(true);
    props.shutConvo()
    // setTexts(true);
    props.switchChat('nav')
  }

  const exitChat = () => {
    // setTexts(false)
    // getTextUpdate(false)
    props.shutConvo()
    props.switchChat(null)
  }

  useEffect(() => {
    console.log('getAdmin', props.user)
    if (props.user.role === 'client') {
      return axios
        .get(`/msg/client`, {
          params: {
            userEmail: props.user.email,
          },
        }).then(({ data }) => {
          setChatHist(data)
        })
    } else if (props.user.role === 'agent') {
      console.log('getAdmin', props.user)
      return axios
        .get(`/msg/agent`, {
          params: {
            agentEmail: props.user.email,
          },
        }).then(({ data }) => {
          console.log('data', data)
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
    console.log('props.routed', props.routed)
    if (chatHist.length > 0) {
      for (let i = 0; i < chatHist.length; i++) {
        if (chatHist[i].chatId === props.chatKey) {
          getCurrChatRoom(chatHist[i])
        }
      }
      if (props.routed) {
        console.log('hithti')
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
    console.log('props.chatKey', props.chatKey)
    if (props.routed) {
      let outdatedChat = [...chatHist];
      for (let i = 0; i < chatHist.length; i++) {
        if (chatHist[i].chatId === currChatRoom.chatId) {
          console.log('chatHist', chatHist[i])
          console.log('outdatedChat[i]', outdatedChat[i])
          let chatRoom = outdatedChat[i];
          console.log('ran', chatRoom)
          chatRoom.messages.push(messageObj);
          getCurrChatRoom(outdatedChat[i]);
          setRender(!render);
        }
      }
    } else {
      let outdatedChat = [...chatHist];
      for (let i = 0; i < outdatedChat.length; i++) {
        if (outdatedChat[i].chatId === chatRoomId) {
          let chatRoom = outdatedChat[i];
          chatRoom.messages.push(messageObj);
          setChatHist(outdatedChat);
        }
      }
    }
  };
    
  
  return (
    <div style={{position: 'relative', zIndex: '99'}}>
      <div>
        {props.convos ? <Convos chatHistory={chatHist} selectConvo={selectConvo} /> : null}
        {props.texts === 'nav' ? <Texts chatBox={chatHist[chatIdx]} exitChat={exitChat} updateConvo={updateConvo} chatId={chatId} loggedIn={props.user}/> : null}
        {props.texts === 'alt' ? <Texts chatBox={currChatRoom} exitChat={exitChat} updateConvo={updateConvo} chatId={props.chatKey} loggedIn={props.user} /> : null}
      </div>
    </div>
  );
};

export default ChatApp;

