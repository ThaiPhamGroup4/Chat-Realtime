const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.render('home');
});

// Bat su kien connection
io.on('connection', (socket) => {
        console.log('A user Connect')
        io.emit('broadcast', "Một thằng lol vừa vào :). Welcome")
    // Bat su kien 'chat message'
    socket.on('chat message', (name, msg) => {
        // GUi su kien Chat message ve client
        io.emit('chat message', name + ': ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('Disconnect')
        io.emit('broadcast', "Một thằng bị mẹ gank nên thoát :) Good bye :(("); // emit an event to all connected sockets
    })
});



const { create } = require('express-handlebars');
const hbs = create({ extname: '.hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('listening on *:', PORT);
});
