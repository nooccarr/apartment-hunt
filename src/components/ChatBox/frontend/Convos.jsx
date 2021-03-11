import React from 'react';

const Convos = ({ chatHistory, selectConvo }) => {


    return (
      <div style={{
        backgroundColor: '#fff',
        border: '3px solid #efaeaa',
        borderRadius: '5px',
        marginTop: '8px'
      }}>
        {chatHistory.map((chat, idx) => (
          <div
            style={{
              padding: '20px 10px',
              textAlign: 'left',
              cursor: 'pointer',
              borderBottom: `${chatHistory.length - 1 === idx ? '' :'2px dotted #efaeaa'}`
            }}
            key={chat.chatId}
            onClick={() => selectConvo(idx)}
          >
            <div>{chat.address}</div>
            <div>{'Agent'}: {chat.agentName}</div>
          </div>
        ))}
      </div>
    )
};

export default Convos;
// `${props.loggedIn.name === messageObj.sender ? 'flex-end' : ''}`

{/* <div>{props.role === 'client' ? 'agent' : 'client'}: {props.role === 'client' ? chat.agentName : chat.userName}</div> */}