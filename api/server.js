const express = require("express")
const cors = require("cors")

const api = express()

// register middleware for receiving chat messages as JSON
api.use( cors() )
api.use( express.json() )

api.get("/", (req, res) => {
    res.json({ message: "Welcome from Chat API" })
})

// register client for chat STREAM route for RETRIEVING of incoming messages
// frontend user will call this route just ONCE on starting up 
// -> and keeps connection open for ongoing events
api.get('/messages', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "text/event-stream")
    res.header('Content-Encoding', 'none')
    res.header("Cache-Control", "no-cache, no-transform")
    res.header("Connection", "keep-alive")

    res.flushHeaders() // force sending of headers before data

    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify({ user: "Admin", message: "May the force be with you..."})}\n\n`);

    // register event listener on express instance!
    api.on("message", (msg) => {
        // console.log("Event with new message received...")
        // write the message to everbody listening to this stream
        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(msg)}\n\n`);
    })
})



// route for receiving new messages and forward them to stream
api.post('/message', (req, res, next) => {
    const { user, message } = req.body;
    let msg = { user, message, timestamp: Date.now() }

    // forward the message to the stream
    console.log("Message received: ", msg)
	api.emit('message', msg);
    res.json( msg );
})


const PORT = process.env.PORT || 5000
api.listen(PORT, () => console.log(`${PORT} started`))
