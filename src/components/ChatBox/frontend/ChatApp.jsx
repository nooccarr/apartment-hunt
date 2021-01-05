import React, { useState, useEffect } from 'react';
// import Dashboard from './Dashboard.jsx';
import Convos from './Convos.jsx';
// import sampleChatData from './sampleChatData.js';
import Texts from './Texts.jsx';
import loggedUser from './sampleUser'
import axios from 'axios';


const ChatApp = () => {

  // function useAsyncState(initialValue) {
  //   const [value, setValue] = useState(initialValue);
  //   const setter = x =>
  //     new Promise(resolve => {
  //       setValue(x);
  //       resolve(x);
  //     });
  //   return [value, setter];
  // }

  const [convos, setConvos] = useState(false);
  const [texts, setTexts] = useState(false);
  const [chatIdx, setChatIdx] = useState(null);
  const [chatHist, setChatHist] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [firstRender, setFirstRender] = useState(false);

  const [conAge, setConAge] = useState(false);
  const [getChatHist, setGetChatHist] = useState(false);
  const [getIndvChat, setGetIndvChat] = useState(false);
  
  // const [chatHistId, setChatHistId] = useState(null)

  const selectConvo = (id) => {
    setChatIdx(id);
    setChatId(chatHist[id].chatId)
    setConvos(false);
    setTexts(true);
  }

  const exitChat = () => {
    setTexts(false)
  }

  //Axios get
  useEffect(() => {
    if (!loggedUser.role === 'client' || !loggedUser.role === 'agent') {
      return;
    }
    let user = loggedUser.role ;
      // console.log('hitEffect', loggedUser.user)
      return axios.get(`/msg/${user}`, {
        params: {
          userName: loggedUser.user
        }
      }).then(({ data }) => {
        // console.log('dataHist: ', data);
        setChatHist(data)
        // console.log('newDataHist: ', data);
      })
    // setChatHist(sampleChatData)
  }, [])

  useEffect(() => {
    if (!loggedUser.role === 'client' || !loggedUser.role === 'agent') {
      return;
    }
    let user = loggedUser.role ;
      // console.log('hitEffect', loggedUser.user)
      return axios.get(`/msg/${user}`, {
        params: {
          userName: loggedUser.user
        }
      }).then(({ data }) => {
        // console.log('dataHist: ', data);
        setChatHist(data)
        // console.log('newDataHist: ', data);
      })
    // setChatHist(sampleChatData)
  }, [convos])

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

  // async function changeHist(data) {
  //   await setChatHist(data)
  //   console.log('here', data)
  //   console.log('firstHistory: ', chatHist);
  // }

  useEffect(() => {
    console.log('effect', firstRender)
    if (!firstRender) {
      setFirstRender(true)
      return;
    }
    console.log('hit:');
    axios.post('/chatRoom', {
      address: '47382 Please Ave',
      userName: 'LOLA64739',
      agentName: 'harvey83924',
      userId: '573272',
      agentId: '273849',
      messages: [],
    }).then(() => {
      setGetChatHist(!getChatHist)
    })
  }, [conAge])

  useEffect(() => {
    console.log('effect2', firstRender)
    if (!firstRender) {
      // setFirstRender(true)
      return;
    }
    console.log('hit2:');
    return axios.get(`/msg/client`, {
      params: {
        userName: loggedUser.user
      }
    }).then(({ data }) => {
      console.log('here', data)
      setChatHist(data)
      console.log('firstHistory: ', chatHist);
      setGetIndvChat(!getIndvChat)
    })
  }, [getChatHist])

  useEffect(() => {
    if (!firstRender) {
      // setFirstRender(true)
      return;
    }
    console.log('firstHistory: ', chatHist);
    let chatInfo = {address: '47382 Please Ave', userName: 'LOLA64739'}
    return axios.get('/chatRoom', { 
      params: {
        address: chatInfo.address,
        userName: chatInfo.userName,
      }
    }).then(({ data }) => {
        console.log('convo: ', data);
        console.log('chatHistory: ', chatHist);
        for (let i = 0; i < chatHist.length; i++) {
          console.log('chatHist[i].chatId: ', chatHist[i].chatId);
          console.log('data[0].chatId: ', data[0].chatId);
          if (chatHist[i].chatId === data[0].chatId) {
            console.log('I: ', i);
            setChatIdx(i);
            console.log('IAfter: ', chatIdx);
            console.log('chatHistId: ', chatId);
            setChatId(data[0].chatId)
            console.log('AfterchatHistId: ', chatId);
            console.log('Texts: ', texts);
            setTexts(true);
            console.log('AfterTexts: ', texts);
          }
        }
    })
  }, [getIndvChat])


  // useEffect(() => {
  //   console.log('convo: ', data);
  //   console.log('chatHistory: ', chatHist);
  //   for (let i = 0; i < chatHist.length; i++) {
  //     console.log('chatHist[i].chatId: ', chatHist[i].chatId);
  //     console.log('data[0].chatId: ', data[0].chatId);
  //     if (chatHist[i].chatId === data[0].chatId) {
  //       console.log('I: ', i);
  //       setChatIdx(i);
  //       console.log('IAfter: ', chatIdx);
  //       console.log('chatHistId: ', chatHistId);
  //       setChatId(chatHistId)
  //       console.log('AfterchatHistId: ', chatHistId);
  //       console.log('Texts: ', texts);
  //       setTexts(true);
  //       console.log('AfterTexts: ', texts);
  //     }
  //   }
  // }, [getIndvChat])
  
  // const openChat = (i, chatHistId) => {
  //   console.log('chatHistId: ', chatHistId);
  //   console.log('I: ', i);
  //   setChatIdx(i);
  //   setChatId(chatHistId)
  //   setTexts(true);
  // }
  
  // const createChatRoom = () => {
  //   // return axios.get('/details', {})
  //   // .then((chatParams) => {
  //     axios.post('/chatRoom', {
  //       address: '47382 Please Ave',
  //       userName: 'Phil54356',
  //       agentName: 'harvey83924',
  //       userId: '573272',
  //       agentId: '273849',
  //       messages: [],
  //   })
  //   .then(() => {
  //     return axios.get(`/msg/client`, {
  //       params: {
  //         userName: loggedUser.user
  //       }
  //     })
  //   })
  //   .then(({ data }) => {
  //     console.log('here', data)
  //     setChatHist(data)
  //     console.log('firstHistory: ', chatHist);
  //     // setHistChat(!histChat)
  //     // let chatHistChange = await changeHist(data)
  //     // changeHist(data);
  //     // console.log(chatHistChange)
  //   }).then(() => {
  //     console.log('secondHistory: ', chatHist);
  //     let chatInfo = {address: '47382 Please Ave', userName: 'Phil54356'}
  //     return axios.get('/chatRoom', { 
  //       params: {
  //         address: chatInfo.address,
  //         userName: chatInfo.userName,
  //       }
  //     })
  //   })
  //   .then(({ data }) => {
  //     console.log('convo: ', data);
  //     console.log('chatHistory: ', chatHist);
  //     for (let i = 0; i < chatHist.length; i++) {
  //       console.log('chatHist[i].chatId: ', chatHist[i].chatId);
  //       console.log('data[0].chatId: ', data[0].chatId);
  //       if (chatHist[i].chatId === data[0].chatId) {
  //         console.log('I: ', i);
  //         setChatIdx(i);
  //         console.log('IAfter: ', chatIdx);
  //         console.log('chatHistId: ', chatHistId);
  //         setChatId(chatHistId)
  //         console.log('AfterchatHistId: ', chatHistId);
  //         console.log('Texts: ', texts);
  //         setTexts(true);
  //         console.log('AfterTexts: ', texts);
  //       }
  //     }
  //   }).catch((err) => {
  //     console.log('error: ', err);
  //   })
  // };

  
  
  
  return (
    <div>
      <nav style={{ margin: '0 auto', width: '73%', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ marginRight: '0px' }}>Apartment Hunt</span>
        <img onClick={() => setConvos(!convos)} style={{ cursor: 'pointer' }} width="25" height="30" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTAgMzQ5LjAyMmMwIDEyLjE4NyAxMy44MDggMTkuMjc3IDIzLjcxMSAxMi4yMTFsODIuNDcxLTU4LjgzMmM2LjkxNy00LjkzNCAxNS4wNjUtNy41NDIgMjMuNTYzLTcuNTQyaDE4MS4zODJjMzEuOTI4IDAgNTcuOTAyLTI1Ljk3NSA1Ny45MDItNTcuOTAydi0xOTAuMzMxYzAtOC4yODQtNi43MTYtMTUtMTUtMTVoLTI5Ni4xMjdjLTMxLjkyNyAwLTU3LjkwMiAyNS45NzQtNTcuOTAyIDU3LjkwMnptMzAtMjU5LjQ5NGMwLTE1LjM4NiAxMi41MTctMjcuOTAyIDI3LjkwMi0yNy45MDJoMjgxLjEyNnYxNzUuMzMxYzAgMTUuMzg2LTEyLjUxNyAyNy45MDItMjcuOTAyIDI3LjkwMmgtMTgxLjM4MmMtMTQuNzggMC0yOC45NTIgNC41MzctNDAuOTg0IDEzLjEybC01OC43NiA0MS45MTd6Ii8+PHBhdGggZD0ibTUxMiAyMDUuODc2YzAtMzEuOTMyLTI1Ljk3NC01Ny45MS01Ny45LTU3LjkxaC00MC4wN2MtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNWg0MC4wN2MxNS4zODUgMCAyNy45IDEyLjUyMSAyNy45IDI3LjkxdjIzMC4zNjRsLTU4Ljc1OS00MS45MTVjLTEyLjAzMS04LjU4My0yNi4yMDItMTMuMTE5LTQwLjk4MS0xMy4xMTloLTE4MS4zOWMtMTUuMzg1IDAtMjcuOS0xMi41MjEtMjcuOS0yNy45MXYtMTMuNDM5YzAtOC4yODQtNi43MTYtMTUtMTUtMTVzLTE1IDYuNzE2LTE1IDE1djEzLjQzOWMwIDMxLjkzMiAyNS45NzQgNTcuOTEgNTcuOSA1Ny45MWgxODEuMzljOC40OTcgMCAxNi42NDQgMi42MDcgMjMuNTYgNy41NDFsODIuNDcgNTguODNjOS44NTMgNy4wMzEgMjMuNzExLjAxNSAyMy43MTEtMTIuMjExdi0yNTkuNDl6Ii8+PHBhdGggZD0ibTEwNy44NjIgMTQzLjMzOWgxNzMuMzA0YzguMjg0IDAgMTUtNi43MTYgMTUtMTVzLTYuNzE2LTE1LTE1LTE1aC0xNzMuMzA0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1eiIvPjxwYXRoIGQ9Im0xMDcuODYyIDIxMy4zMzloMTczLjMwNGM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNWgtMTczLjMwNGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNXoiLz48L2c+PC9zdmc+" />
      </nav>
      <div>
        {convos ? <Convos chatHistory={chatHist} selectConvo={selectConvo} role={loggedUser.role}/> : null}
        {texts ? <Texts chatBox={chatHist[chatIdx]} exitChat={exitChat} updateConvo={updateConvo} chatId={chatId} loggedIn={loggedUser}/> : null}
        <div onClick={() => setConAge(!conAge)}>Contact Agent</div>
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