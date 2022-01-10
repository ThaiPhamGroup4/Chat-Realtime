const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.render('home');
});

// 
// io.on('connection', (socket) => {
//     console.log('a user connected');

//     console.log('Welcome: (^_^)!')
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });

// // Nhan tin nhan submit tu client
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//       });
// });

// Bat su kien connection
io.on('connection', (socket) => {
        console.log('A user Connect')
        io.emit('broadcast', "A user connected")
    // Bat su kien 'chat message'
    socket.on('chat message', (msg) => {
        // GUi su kien Chat message ve client
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('Disconnect')
        io.emit('broadcast', "A user disconnected. Good bye :(("); // emit an event to all connected sockets
    })
});



const { create } = require('express-handlebars');
const hbs = create({ extname: '.hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


server.listen(3000, () => {
    console.log('listening on *:3000');
});
