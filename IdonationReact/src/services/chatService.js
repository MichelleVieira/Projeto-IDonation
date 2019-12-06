import openSocket from 'socket.io-client';

const requestOptions = {
	headers: { 'Content-Type': 'application/json' }
};

const socket = openSocket('http://localhost:3002/', requestOptions);

export const chatService = {
	sendMessage,
	socket,
	showTyping
};

function showTyping(user) {
	socket.emit('typing', user);
}

function sendMessage(objSend){
	socket.emit('chat message', objSend);
}