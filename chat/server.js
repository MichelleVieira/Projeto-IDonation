const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

mongoose.connect('mongodb+srv://Admin:5mcfcXHiav185Qym@cluster0-sqjvu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
    console.log('Database connected');
})

mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
})

app.use('/', (req, res) => {
    res.render('index.html');
})

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previusMessage', messages);

    socket.on('sendMessage', data => {
        console.log(data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3002);