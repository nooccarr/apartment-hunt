import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

function SocketRender({ id, text }) {
    const [socket, setSocket] = useState()
  
    useEffect(() => {
      const newSocket = io(
        'http://localhost:5000',
        { query: { id } }
      )
      setSocket(newSocket)
  
      return () => newSocket.close()
    }, [id])
  
    return (
      <div value={socket}>
        {text}
      </div>
    )
}


export default SocketRender;
