import { useEffect, useRef, useState } from "react";
import faker from 'faker'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

console.log({ API_URL })

function App() {

  const evtSource = useRef()
  const [user, setUser] = useState( faker.name.firstName() )
  const msgRef = useRef()
  const [history, setHistory] = useState([
    { user: "Admin", message: "Welcome", timestamp: 1}
  ])

  const onMessageEvent = (event) => {
    const data = JSON.parse( event.data ); // convert event string to object
    console.log("Received:", data)
    if(data.type === "heartbeat") return // ignore heartbeat messages
    setHistory([...history, data])
  }

  useEffect(() => {
    evtSource.current = new EventSource(`${API_URL}/messages`);

    evtSource.current.onerror = (e) => {
      console.log(e)
      evtSource.current.close()
    }

    return () => evtSource && evtSource.current.close()

  }, [])

  useEffect(() => {

    // EventSource attaches to the API route
    // and forwards us all data as objects!
    evtSource.current.addEventListener('message', onMessageEvent)

    return () => {
      evtSource && evtSource.current.removeEventListener('message', onMessageEvent)
    }

  }, [ history ])

  // send event
  const onSubmit = async (e) => {
    e.preventDefault()
    
    const msgToSend = msgRef.current.value 

    if(!msgToSend) return 

    console.log("Sending: ", msgToSend)

    try {
      fetch(`${API_URL}/message`, {
          method: "POST", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              user,
              message: msgToSend
          })
      })
      .catch((err) => {
        console.log(err)
        msgRef.current.value = msgToSend
      })
      msgRef.current.value = ""
    }
    catch(err) {
      console.log(err.message)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
      </header>
      <main>
        <div className="chat-area">
          <form id="frmChat" autoComplete="off" onSubmit={onSubmit}>
            <div className="history">
              {history.map(entry => (
                <div key={entry.timestamp} className="msg">
                  <span >{entry.user}</span>: <span>{entry.message}</span>
                </div>
              ))}
              {/* <textarea readOnly rows="5" cols="30"></textarea> */}
            </div>              
            <input type="text" value={user} 
              placeholder="User..."
              onChange={(e) => setUser(e.target.value)} />
            <input type="text" ref={msgRef}  
              placeholder="New Message..."
            />
            <button type="submit" >Send</button>
        </form>

        </div>
      </main>
      <footer>
        &copy; Rob Chat Unlimited - All Messaging rights reserved worldwide
      </footer>
    </div>
  );
}

export default App;
