const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http')
const socketIO = require('socket.io')
var path = require('path')
app.use(express.static(path.join(__dirname, '../uploads')))

const port = 4000

const server = http.createServer(app)

const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('New client connected')

    socket.on('vacations', (data) => {
        io.sockets.emit('vacations', data)
    })

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})



var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const Users = require('./routes/Users');
app.use(Users);

const Vacation = require('./routes/Vacations')
app.use(Vacation)

const Join = require('./routes/join')
app.use(Join)


app.use((req, res) => {
    res.send('<h1>Page not found</h1>')
})


server.listen(port, () => console.log(`Listening on port ${port}`))
