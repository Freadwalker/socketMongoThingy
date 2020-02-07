//Establishing Websocket Server Connection
const WebSocket = require("ws"),
    server = new WebSocket.Server({
      port:12345,
    });
let collectionArray=[];
//Setting up MongoDB Driver
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost/test';

  MongoClient.connect(url,async function(err,db){
    collectionArray = await db.collection('documents').find().toArray();
  })



async function getNextValue(){
  if( typeof getNextValue.counter == 'undefined' ) {
    getNextValue.counter = 0;
  }

  if(getNextValue.counter<collectionArray.length){
    
    console.log(collectionArray[getNextValue.counter].name);
    getNextValue.counter++;
   //return collectionArray[getNextValue.counter].name;

  }else{
    getNextValue.counter=0;
  }

}
setInterval(()=>getNextValue(),1000);

// function broadcast(data){
//   server.clients.forEach(ws=>{
//     ws.send(data);
//   })
// }

// server.on('connection',ws=>{
//       ws.on('message',data=>{
//           ws.send(getNextValue());
//       })
// });