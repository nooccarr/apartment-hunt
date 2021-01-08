import React from 'react';

const Convos = (props) => {


    return (
      <div style={{backgroundColor: 'rgb(245 144 162)'}}>
        {props.chatHistory.map((chat, idx) => (
          <div style={{padding: '20px 10px', borderBottom: '1px solid #fff'}} key={chat.chatId} onClick={() => props.selectConvo(idx)}>
            <div>{chat.address}</div>
            <div>{'Agent'}: {chat.agentName}</div>
          </div>
        ))}
      </div>
    )
};

export default Convos;



{/* <div>{props.role === 'client' ? 'agent' : 'client'}: {props.role === 'client' ? chat.agentName : chat.userName}</div> */}