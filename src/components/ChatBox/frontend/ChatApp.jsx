import React, { useState, useEffect } from 'react';
import Convos from './Convos.jsx';
// import sampleChatData from './sampleChatData.js';
import Texts from './Texts.jsx';
import loggedUser from './sampleUser'
import axios from 'axios';


const ChatApp = (props) => {
  // not used const [convos, setConvos] = useState(false);

  // const [texts, setTexts] = useState(false);
  const [chatIdx, setChatIdx] = useState(null);
  const [chatHist, setChatHist] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [firstRender, setFirstRender] = useState(false);

  const [conAge, setConAge] = useState(false);
  const [getChatHist, setGetChatHist] = useState(false);
  const [getIndvChat, setGetIndvChat] = useState(false);

  const [textUpdate, getTextUpdate] = useState(false);

  // const [inRoom, setInRoom] = useState(false);
  

  const selectConvo = (id) => {
    setChatIdx(id);
    setChatId(chatHist[id].chatId)
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
      return axios.get(`/msg/client`, {
        params: {
          userName: props.userLoggin.name
        }
      }).then(({ data }) => {
        setChatHist(data)
      })
  }, [textUpdate])

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
        let chatRoom = outdatedChat[i]
        chatRoom.messages.push(messageObj)
        setChatHist(outdatedChat)
      }
    }
  }

  // useEffect(() => {
  //   if (!firstRender) {
  //     setFirstRender(true)
  //     return;
  //   }
  //   axios.post('/chatRoom', {
  //     address: '13 Sun Ave',
  //     userName: 'FreddieMercury',
  //     agentName: 'Smith',
  //     messages: [],
  //   }).then(() => {
  //     setGetChatHist(!getChatHist)
  //   })
  // }, [conAge])

  // useEffect(() => {
  //   if (!firstRender) {
  //     return;
  //   }
  //   console.log('hit2:');
  //   return axios.get(`/msg/client`, {
  //     params: {
  //       userName: props.userLoggin.name
  //     }
  //   }).then(({ data }) => {
  //     setChatHist(data)
  //     setGetIndvChat(!getIndvChat)
  //   })
  // }, [getChatHist])

  // useEffect(() => {
  //   if (!firstRender) {
  //     return;
  //   }
  //   let chatInfo = {address: '13 Sun Ave', userName: 'FreddieMercury'}
  //   return axios.get('/chatRoom', { 
  //     params: {
  //       address: chatInfo.address,
  //       userName: chatInfo.userName,
  //     }
  //   }).then(({ data }) => {
  //       for (let i = 0; i < chatHist.length; i++) {
  //         if (chatHist[i].chatId === data[0].chatId) {
  //           setChatIdx(i);
  //           setChatId(data[0].chatId)
  //           // setTexts(true);
  //           props.switchChat('conAge')
  //         }
  //       }
  //   })
  // }, [getIndvChat])
    
  
  return (
    <div>
      <div>
        {props.convos ? <Convos chatHistory={chatHist} selectConvo={selectConvo} /> : null}
        {props.texts === 'nav' ? <Texts chatBox={chatHist[chatIdx]} exitChat={exitChat} updateConvo={updateConvo} chatId={chatId} loggedIn={props.userLoggin}/> : null}
      </div>
    </div>
  );
};

export default ChatApp;





 // console.log('updateConvo')
    // let outdatedChat = [...chatHist];
    // let chatRoom = outdatedChat[chatIdx]
    // // let newMessage = sendSocket(chatHist[chatIdx].chatId, messageObj.message)
    // chatRoom.messages.push(messageObj)
    // setChatHist(outdatedChat)
    // // storeConvo(messageObj)


    //Axios get
  // useEffect(() => {
    // if (!loggedUser.role === 'client' || !loggedUser.role === 'agent') {
    //   return;
    // }
    // let user = loggedUser.role ;
      // console.log('hitEffect', loggedUser.user)
      // return axios.get(`/msg/${user}`, {
      //   params: {
      //     userName: loggedUser.user
      //   }
      // }).then(({ data }) => {
        // console.log('dataHist: ', data);
        // setChatHist(data)
        // console.log('newDataHist: ', data);
      // })
    // setChatHist(sampleChatData)
  // }, [])


  // role={props.loggedUser.role}