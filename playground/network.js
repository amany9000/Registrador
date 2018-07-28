
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
          class: "transaction",
          timestamp: "1234345",
          landID : "land23",
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
          hashMerkleRoot: "8D21EE9C2FB680B63159B3FC53EEEF27A6C214814A92BDDD44F3AC393DCD1FBE",
          blockTimeStamp: 1532701980760
        },
        transactionCount: 3,
        transactionList: [
          "{\n  \"class\": \"transaction\",\n  \"timeStamp\": 1234563425,\n  \"landID\": \"land23\",\n  \"from\": [\n    \"User2\",\n    \"User4\"\n  ],\n  \"to\": [\n    \"User2\"\n  ],\n  \"amount\": 123213\n}",
          "{\n  \"class\": \"transaction\",\n  \"timeStamp\": 1232452,\n  \"landID\": \"land45\",\n  \"from\": [\n    \"User3\"\n  ],\n  \"to\": [\n    \"User1\"\n  ],\n  \"amount\": 1232\n}",
          "{\n  \"class\": \"transaction\",\n  \"timeStamp\": 123456,\n  \"landID\": \"land67\",\n  \"from\": [\n    \"User1\"\n  ],\n  \"to\": [\n    \"User2\"\n  ],\n  \"amount\": 123211213\n}"
        ],
        blockGenerator: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0gv4+6ExB1KFh6AjTv5N\nVjUirfA39/bikodnmWQdsrBcCclLS2avt262M4DoWPiSgjB78be2AH4qwk2Lz7xe\ny3A+smCPfLaA5hUbwYfW1pfmrgMqXUEmpQ95vTPG21lZ246xk7Ozej4pABKlQeJw\nmZszKF5H5rI7S4XGAfpYK56163hefIQuhXmAz/ncUaLBCzxL0rS8yYyudC5z1OYd\n9Jl/KVWKJn+KvzO/jJ3FWrGA759jhdf+c8j9PJHI7uq5kVbOvCxXAgw7VzrcGOao\nWN3+Yn7ZComWS2NdDG5iTp/sZhPKxuJGc9GhIh7AA5iRQvNOuFYtmnEdQFJey2ds\nQwIDAQAB\n-----END PUBLIC KEY-----\n",
        signature: "p3DZJ/0WNB8+XQrm+q6rU+U5uD0dF4gkWB/YITD+IxYLYuymuCjHpmCds136g3OMYM5h9krgE26zmEdiiVqThQzYuchJ/kLrnZ+2m8GV1bgxdo39KTFKq70AZrYGuPdQHTDSJdSkcIvVrdzMNrxYWXSUkrVTgfT4PoIAWqLrpvZRFQ1uxMN9C6qLEdH/LaYHxxsFzMPejZfIMdXome2LrqQBu29rv7S8AcJ22ojR7VLdG4F74jVkmjzlBNXrQsqUMKzsFBDxZMs7yqqKU4D1m3VsgSkOI6RQCNy+1A2VQcGAQa13NdY1C7BamAptUrHJJlZ5KKb2I8pJLxN4U41GQw=="
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


