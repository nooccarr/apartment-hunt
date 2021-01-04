import React from 'react';

const Convos = (props) => {

  console.log('props.chatHistory', props.chatHistory)

  if (!props.chatHistory) {
    return (
      <div>
        ...loading conversations
      </div>
    )
  } else {
    return (
      <div style={{backgroundColor: 'rgb(213 11 160)', width: '29%', float: 'right'}}>
        <h4 style={{textDecoration: 'underline'}}>CHAT HISTORY</h4>
        {props.chatHistory.map((chat, idx) => (
          <div key={chat.chatId} onClick={() => props.selectConvo(idx)}>
            <div>{chat.address}</div>
            <div>Agent: {chat.messages[chat.messages.length - 1].sender}</div>
          </div>
        ))}
      </div>
    )
  }
};

export default Convos;

// Sidebar