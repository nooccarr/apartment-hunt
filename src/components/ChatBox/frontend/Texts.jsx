import React, { useState }  from 'react'
import loggedUser from './sampleUser'
import { Form, InputGroup, Button } from 'react-bootstrap'


const Texts = (props) => {

  const [text, setText] = useState('');
  // const { sendMessage } = useConversations()

  function handleSubmit(e) {
    e.preventDefault();

    // sendMessage()
    
    props.updateConvo(
      {
        message: text,
        sender: loggedUser,
        // createdAt: 
      }
      ) 
    setText('')
  }

  // console.log('here', props)
  // console.log(text)


  return (
    <div style={
        {
        position: 'fixed',
        bottom: '0',
        backgroundColor: '#fff',
        padding: '25px',
        paddingBottom: '0',
        left: '70%'
      }
    }>
      <button onClick={props.exitChat}>X</button>
      <div>{props.chatBox.address}</div>
      <div className='d-flex flex-grow-1 overflow-auto'>
        <div>
          {console.log('chatBox', props.chatBox)}
          {props.chatBox.messages.map((text, index) => (
          <div 
            key={index}
            className={`my-1 d-flex flex-column ${loggedUser === text.sender ? 'align-items-end' : 'align-items-start'} justified-content-end`}>
              {(() => { if (text.sender === loggedUser) {
                return (
                  <div className="text-right">
                    <div className={'rounded px-2 py-1 bg-primary text-white'}>{text.message}</div>
                    <div className={'text-muted small'}>You</div>
                  </div>
                )} else {
                  return (
                  <div>
                    <div className={'rounded px-2 py-1 border'}>{text.message}</div>
                    <div className={'text-muted small'}>{text.sender}</div>
                  </div>
                  )
                }
              })()}
            </div>
          ))}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{marginBottom: '10px'}}>
          <InputGroup>
          <Form.Control
            as="textarea"
            required
            value={text}
            onChange={e => setText(e.target.value)}
            style={{height: '50px', resize: 'none'}}
          />
          <InputGroup.Append>
            <Button type='submit'>Send</Button>
          </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Texts;
