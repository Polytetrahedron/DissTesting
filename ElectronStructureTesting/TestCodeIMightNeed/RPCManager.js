const grpc = require('grpc');
const ip = require('ip');
const RPCListener = require('../NodeAssets/RPCAssets/RPCListener')
const listeningPort = "3453"
const clientPort = "3456";
const localIP = ip.address();

let listeningPost;
let client;
let connectedServer;


function spawnRPCProcesses()
{
    
}