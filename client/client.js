//Import WebSocket from npm-ws
const WebSocket = require('ws');

//Connect to WebSocket Server...
const ws = new WebSocket(`ws://localhost:${process.env.PORT}`);

//Declare IntervalID to clear later...
let intervalId;

//As soon as connection to WebSocket-Server isestablished, request Data every second...
ws.onopen = () => {
    intervalId = setInterval(() => { ws.send() }, 1000);
}

//As soon as a message has been sent from server, print out message in console. Here we retrieve the data from MongoDB...
ws.onmessage = (e) => {
    console.log(e.data);
}

//As soon as connection with WebSocket-Server has ended, clear the interval...
ws.onclose = () => {
    clearInterval(intervalId);
}