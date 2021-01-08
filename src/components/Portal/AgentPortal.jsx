import React, { useState, useEffect } from 'react';
import logUser from './logUser.js';
import axios from 'axios';
import Texts from '../ChatBox/frontend/Texts.jsx';
import AppliedApartments from '../Agent/AppliedApartments.jsx';

const AgentPortal = (props) => {
  // let admin = {
  //   name: 'laura90',
  //   email: 'laura90@gmail.com',
  //   role: 'agent'
  // }

  const [chatHist, setChatHist] = useState([]);
  const [chatIdx, setChatIdx] = useState(null);
  const [texts, setTexts] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [resetId, setResetId] = useState(false);

  useEffect(() => {
    return axios
      .get(`/msg/agent`, {
        params: {
          userName: props.admin.email,
        },
      })
      .then(({ data }) => {
        // console.log('here', data)
        setChatHist(data);
      });
  }, [resetId]);

  useEffect(() => {
    if (!firstRender) {
      console.log("didn't run");
      setFirstRender(true);
      return;
    }
    console.log('run');
    setChatId(chatHist[chatIdx].chatId);
    setTexts(true);
  }, [resetId]);

  //////////////////////////////////////Keep socket connection//////////////////////////
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

  const exitChat = () => {
    setTexts(false);
  };

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
      <div
        style={{
          width: '40%',
          maxWidth: '475px',
          height: '515px',
          border: '1px solid black',
          display: 'inline-block',
          position: 'fixed',
          backgroundColor: '#fff',
          top: '30vh',
          left: '10%',
          padding: '25px',
        }}>
        <h2>Property Inquiries</h2>
        <div>
          <div>
            <div style={{ display: 'inline-block', width: '33.3%' }}>From</div>
            <div style={{ display: 'inline-block', width: '33.3%' }}>
              Address
            </div>
            <div style={{ display: 'inline-block', width: '33.3%' }}>
              <img
                width='25'
                height='30'
                src='data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTAgMzQ5LjAyMmMwIDEyLjE4NyAxMy44MDggMTkuMjc3IDIzLjcxMSAxMi4yMTFsODIuNDcxLTU4LjgzMmM2LjkxNy00LjkzNCAxNS4wNjUtNy41NDIgMjMuNTYzLTcuNTQyaDE4MS4zODJjMzEuOTI4IDAgNTcuOTAyLTI1Ljk3NSA1Ny45MDItNTcuOTAydi0xOTAuMzMxYzAtOC4yODQtNi43MTYtMTUtMTUtMTVoLTI5Ni4xMjdjLTMxLjkyNyAwLTU3LjkwMiAyNS45NzQtNTcuOTAyIDU3LjkwMnptMzAtMjU5LjQ5NGMwLTE1LjM4NiAxMi41MTctMjcuOTAyIDI3LjkwMi0yNy45MDJoMjgxLjEyNnYxNzUuMzMxYzAgMTUuMzg2LTEyLjUxNyAyNy45MDItMjcuOTAyIDI3LjkwMmgtMTgxLjM4MmMtMTQuNzggMC0yOC45NTIgNC41MzctNDAuOTg0IDEzLjEybC01OC43NiA0MS45MTd6Ii8+PHBhdGggZD0ibTUxMiAyMDUuODc2YzAtMzEuOTMyLTI1Ljk3NC01Ny45MS01Ny45LTU3LjkxaC00MC4wN2MtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNWg0MC4wN2MxNS4zODUgMCAyNy45IDEyLjUyMSAyNy45IDI3LjkxdjIzMC4zNjRsLTU4Ljc1OS00MS45MTVjLTEyLjAzMS04LjU4My0yNi4yMDItMTMuMTE5LTQwLjk4MS0xMy4xMTloLTE4MS4zOWMtMTUuMzg1IDAtMjcuOS0xMi41MjEtMjcuOS0yNy45MXYtMTMuNDM5YzAtOC4yODQtNi43MTYtMTUtMTUtMTVzLTE1IDYuNzE2LTE1IDE1djEzLjQzOWMwIDMxLjkzMiAyNS45NzQgNTcuOTEgNTcuOSA1Ny45MWgxODEuMzljOC40OTcgMCAxNi42NDQgMi42MDcgMjMuNTYgNy41NDFsODIuNDcgNTguODNjOS44NTMgNy4wMzEgMjMuNzExLjAxNSAyMy43MTEtMTIuMjExdi0yNTkuNDl6Ii8+PHBhdGggZD0ibTEwNy44NjIgMTQzLjMzOWgxNzMuMzA0YzguMjg0IDAgMTUtNi43MTYgMTUtMTVzLTYuNzE2LTE1LTE1LTE1aC0xNzMuMzA0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1eiIvPjxwYXRoIGQ9Im0xMDcuODYyIDIxMy4zMzloMTczLjMwNGM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNWgtMTczLjMwNGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNXoiLz48L2c+PC9zdmc+'
              />
            </div>
          </div>
          <div>
            {chatHist.map((inQs, idx) => (
              <React.Fragment>
                {(() => {
                  if (inQs.messages.length > 0) {
                    return (
                      <div
                        style={{ maxHeight: '50px', overflow: 'hidden' }}
                        key={idx}
                        onClick={() => {
                          setChatIdx(idx);
                          setResetId(!resetId);
                        }}>
                        <div
                          style={{
                            display: 'inline-block',
                            width: '33.3%',
                            verticalAlign: 'top',
                            maxHeight: '50px',
                            overflowWrap: 'anywhere',
                          }}>
                          {inQs.userName}
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            width: '33.3%',
                            verticalAlign: 'top',
                            maxHeight: '50px',
                            overflowWrap: 'anywhere',
                          }}>
                          {inQs.address}
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            width: '33.3%',
                            verticalAlign: 'top',
                            maxHeight: '50px',
                            overflowWrap: 'anywhere',
                          }}>
                          {inQs.messages[inQs.messages.length - 1].message}
                        </div>
                      </div>
                    );
                  }
                })()}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          width: '40%',
          maxWidth: '475px',
          height: '515px',
          border: '1px solid black',
          display: 'inline-block',
          position: 'fixed',
          backgroundColor: '#fff',
          top: '30vh',
          right: '10%',
          padding: '25px',
          overflow: 'scroll'
        }}>
        <h2>Document Upload</h2>
        <AppliedApartments />
      </div>
      {texts ? (
        <Texts
          chatBox={chatHist[chatIdx]}
          exitChat={exitChat}
          updateConvo={updateConvo}
          chatId={chatId}
          loggedIn={props.admin}
        />
      ) : null}
    </div>
  );
};

export default AgentPortal;

// width: 40%;
// max-width: 475px;
// height: 515px;
// border: 1px solid black;
// display: inline-block;
// position: fixed;
// background-color: #fff;
// top: 30vh;
// left: 30%;
