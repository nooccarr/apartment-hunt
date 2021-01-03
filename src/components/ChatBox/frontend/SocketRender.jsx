import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const SendSocket = ( { messageObj } ) => {
  const [socket, setSocket] = useState()

  console.log('message', messageObj)
  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      { query: messageObj.chatId }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [messageObj.chatId])

  return (

    <div value={socket}>
      {messageObj.message}
    </div>
  )
}


export default SendSocket;
