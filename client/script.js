const WebSocket= require('ws');
const ws = new WebSocket('ws://localhost:12345');

ws.addEventListener('open',()=>{
    ws.send("Next Event");
});