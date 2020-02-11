//Importing npm-ws and establishing Websocket Server Connection...
const WebSocket = require("ws"),
  server = new WebSocket.Server({
    port: process.env.PORT,
  });

//Empty array to store data from MongoDB...
let collectionArray = [];

//Setting up MongoDB Driver...
let MongoClient = require('mongodb').MongoClient;

//Specify the Database, we want to get our data from...
let url = `mongodb://localhost/${process.env.DATABASE}`;

//Connect to MongoDB-Collection and store data in the collectionArray...
MongoClient.connect(url, async function (err, db) {
  collectionArray = await db.collection(process.env.COLLECTION).find().toArray();
})

//Always returns next document of collection if given. Otherwise returns first document...
function getNextValue() {

  //Checks if getNextValue.counter exists, otherwise creates new instance...
  if (typeof getNextValue.counter == 'undefined') {
    getNextValue.counter = 0;
  }

  let data = collectionArray[getNextValue.counter].name;

  if (getNextValue.counter < collectionArray.length - 1) {
    getNextValue.counter++;
  } else {
    delete getNextValue.counter;
  }
  return data;
}

/*As soon as the WebSocket is connected, we wait for a message from the client.
 If a message(request) has been sent, we send the next piece of data. */
server.on('connection', ws => {
  ws.on('message', data => {
    ws.send(getNextValue().toString());
  })
});