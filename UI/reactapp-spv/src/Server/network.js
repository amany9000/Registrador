
const crypto = require('crypto');
const Swarm = require('discovery-swarm');
const defaults = require('dat-swarm-defaults');
const getPort = require('get-port');
const readline = require('readline');
const io = require('socket.io')();
const fs  = require("fs");

const {blockVerify} = require("./clients/GovernmentNode/blockVerify");   
const peers = {}
// Counter for connections, used to identify connections
let connSeq = 0

// Peer Identity, a random hash for identify your peer
const myId = crypto.randomBytes(32)
console.log('Your identity: ' + myId.toString('hex'))

// reference to redline interface
let rl
var a =5;
function log () {
  if (rl) {
    rl.clearLine()
    rl.close()
    rl = undefined
  }
  for (let i = 0, len = arguments.length; i < len; i++) {
    console.log(arguments[i])
  }
  askUser()
}

const askUser = async () => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
    console.log("saap")

  rl.question('Send message: ', message => {
    // Broadcast to peers
    if(message == 't'){
      for (let id in peers) {
      peers[id].conn.write(JSON.stringify({
      class: "transaction",
      data: {
          timeStamp: "1234345",
          landID : "land67",
          from: ["User2"],
          to: ["User1"],
          amount: "12345",
        },
      buyerSignature: "sig1",
      selerSignature: "sig2",
      },undefined,2))}
    }
      else{
      for (let id in peers) {        
        peers[id].conn.write(JSON.stringify({
        class: "block",
        header: {
          blockHeight: 570,
          hashPrevBlock: "c9e6d5695a81e3eab3573b5d4454ada5deb1272af7fa2e8af555b8a4876d6ff6",
          hashMerkleRoot: "EA39237351E74DE296CA0B4308570D37502EB624805629917AAFA085B04402F8",
          blockTimeStamp: 1532701980760
        },
        transactionCount: 2,
        transactionList: [ '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land67",\n    "from": [\n      "User2"\n    ],\n    "to": [\n      "User1"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}',
        '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land2345",\n    "from": [\n      "User2"\n    ],\n    "to": [\n      "User1"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}'],
        blockGenerator: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0gv4+6ExB1KFh6AjTv5N\nVjUirfA39/bikodnmWQdsrBcCclLS2avt262M4DoWPiSgjB78be2AH4qwk2Lz7xe\ny3A+smCPfLaA5hUbwYfW1pfmrgMqXUEmpQ95vTPG21lZ246xk7Ozej4pABKlQeJw\nmZszKF5H5rI7S4XGAfpYK56163hefIQuhXmAz/ncUaLBCzxL0rS8yYyudC5z1OYd\n9Jl/KVWKJn+KvzO/jJ3FWrGA759jhdf+c8j9PJHI7uq5kVbOvCxXAgw7VzrcGOao\nWN3+Yn7ZComWS2NdDG5iTp/sZhPKxuJGc9GhIh7AA5iRQvNOuFYtmnEdQFJey2ds\nQwIDAQAB\n-----END PUBLIC KEY-----\n",
        signature: "PZdQLlHkApTnak5QXtY+iPTiGmKtJaJUOPwuq5pFG90Pcn2hrbzWJiob4mgILxnoziKvUh8m3Jxn/0XVT+3aXx49AloziKzG7wZL+gYb/blrL8Yb2SA8FLAHpVzYnKvubdCmuJcJilZXeTsMqy+skXJ6ZZlG4aLscbL0tQCweS7L+1mcsdXb7RlO4wktZJN6ItAkFeEodVwQAFJ2VrCaxS4aTtHfkyN+2Ba3OnSWcCxWcB2GdfE++3lmPvFgktfg3Q2sDO1okcGgepZhzstf6KBlbtb4h4t9SsDNv+XueR23gP16uO/ffKW6BzrDGBXCT5NtQZ9cXy+EB16EyxHVrg=="
      },undefined,2))}        
    }    
    rl.close()
    rl = undefined
    askUser()
  });
}   

/** 
 * Default DNS and DHT servers
 * This servers are used for peer discovery and establishing connection
 */
const config = defaults({
  // peer-id
  id: myId,
})

/**
 * discovery-swarm library establishes a TCP p2p connection and uses
 * discovery-channel library for peer discovery
 */                  var i = 0;

    
const sw = Swarm(config)


;(async () => {

  const port = await getPort()
  sw.listen(port)
  console.log('Listening to port: ' + port)
  
  var lastHeight = 568;
  const port2 = await getPort();
io.listen(port2);
console.log('listening on port ', port2);

io.on('connection', (client) => {
  client.on('sendTransaction', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    for (let id in peers) {
 peers[id].conn.write(JSON.stringify({"text" : interval, "me" : myId.toString("hex")},undefined,2))    }  
  });
});

  /**
   * The channel we are connecting to.
   * Peers should discover other peers in this channel
   */
  var a =5; 
await sw.join('rohandhoot')
     
  sw.on('connection', (conn, info) => {
    // Connection id
    console.log(a++)

    const seq = connSeq

    const peerId = info.id.toString('hex')
    log(`Connected #${seq} to peer: ${peerId}`)

    // Keep alive TCP connection with peer
    if (info.initiator) {
      try {
        conn.setKeepAlive(true, 600)

      } catch (exception) {
        log('exception', exception)
      }
    }
        while(new Date().getMinutes() === 24){
          if(lastHeight + 1 === JSON.parse(fs.readFileSync("./clients/GovernmentNode/block.json").toString()).header.blockHeight){
            console.log("dhun dhun dhun");
            break;
          }          
    }
    conn.on('data', data => {

      // Here we handle incomming messages
      log(
        'Received Message from peer ' + peerId,
        '----> ' + data.toString()
      )
      blockVerify(data, (reply) => {
        console.log(reply);
      });
      io.emit('getTransaction', data.toString());
      a++;
    })

    conn.on('close', () => {
      // Here we handle peer disconnection
      log(`Connection ${seq} closed, peer id: ${peerId}`)
      // If the closing connection is the last connection with the peer, removes the peer
      if (peers[peerId].seq === seq) {
        delete peers[peerId]
      }
    })

    // Save the connection
    if (!peers[peerId]) {
      peers[peerId] = {}
    }
    peers[peerId].conn = conn
    peers[peerId].seq = seq
    connSeq++

  })

  askUser(a)  

})()


