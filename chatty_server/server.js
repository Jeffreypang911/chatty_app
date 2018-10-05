// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// const clients = []

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
    //sends users online
    let onlineUsers = wss.clients.size;
    let onlineUserObj = {users: onlineUsers, type: "usercount"};
    let onlineUserObjStringified = JSON.stringify(onlineUserObj)

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(onlineUserObjStringified);
        console.log(onlineUserObjStringified);
      }
    });

    
 
    //receives message from client
    ws.on('message', function incoming(data) {
        let parsedData = JSON.parse(data)
        parsedData.id = uuidv4()
        switch(parsedData.type) {
            case "postMessage":
                parsedData.type = "incomingMessage"
                wss.broadcast(parsedData);
            break;
            case "postNotification":
                parsedData.type = "incomingNotification"
                wss.broadcast(parsedData);
            break;
            }
        }
    );    
    //broadcasts to all
    wss.broadcast = function broadcast(data) {
  
        let dataStringify = JSON.stringify(data);
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(dataStringify);
          }
       });
    };

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let onlineUsers = wss.clients.size;
    let onlineUserObj = {users: onlineUsers, type: "usercount"};
    let onlineUserObjStringified = JSON.stringify(onlineUserObj)

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(onlineUserObjStringified);
        console.log(onlineUserObjStringified);
      }
    });
  console.log('Client disconnected')

    }
  
  ); 



});