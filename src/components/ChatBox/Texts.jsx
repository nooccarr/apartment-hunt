import React from 'react'

const Texts = (props) => {
  return (
    <div style={
        {
        position: 'fixed',
        bottom: '0',
        backgroundColor: '#fff',
        padding: '25px',
        left: '70%'
      }
    }>
      <button onClick={props.exitChat}>X</button>
      <div>{props.chatBox.address}</div>
      {props.chatBox.messages.map((text) => (
        <div>
          <div>{text.message}</div>
          <div>{text.sender}</div>
        </div>
      ))}
    </div>
  )
}

export default Texts;
