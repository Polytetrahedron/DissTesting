const grpc = require('grpc');
const ipc = require('node-ipc');
const child = require('child_process');
const ip = require('ip');

let local_ip = ip.address();
let remote_ip;
let server;
let listening_port = '4536';
let server_port = '2356';
let currentUser;

const serviceDescription = require('./ProtoFiles/Comms_grpc_pb');
const dataLayout = require('./ProtoFiles/Comms_pb');

startServer();

function startServer()
{
    server = new grpc.Server();
    server.addService(serviceDescription.ConnectionCommsService, {
        hostDiscovery: hostDiscovery,
        faceUnlock: faceUnlock, //I know this is spelled wrong but I have to live with it for now
        fTPConnection: fTPConnection,
        disconnectNode: disconnectNode,
        fTPInitialize: fTPInitialize
    });
    server.bind(local_ip + ':' + listening_port, grpc.ServerCredentials.createInsecure());
    console.log("Node Server Started: Waiting for Server");
    server.start();
}

function hostDiscovery(call, callback)
{
    console.log("Message Received: Discovery!");
    var reply = new dataLayout.DiscoverResponse();
   
    reply.setServerIp(local_ip);
    
    remote_ip = call.request.getServerIp();
    
    if(remote_ip != null)
    {
        createServerHandlers();
        console.log(remote_ip);
    }
    callback(null, reply);
}

function faceUnlock(call, callback)
{
    console.log("received unlock user")
    var reply = new dataLayout.UnlockResponse()
    reply.setUser('recieved')
    currentUser = call.request.getUser();
    sendMessage = ['sysCall', 'unlocked', currentUser]
    grpcHandler.send(sendMessage)

    callback(null, reply)
}

function fTPInitialize()
{
    // Not implemented Not needed
}

function fTPConnection()
{

}

function disconnectNode()
{
    // Not implemented Not needed
}

function createServerHandlers()
{
    const ipcHandler = child.fork("./Processes/ipcProcess");
    ipcHandler.on('message', (data)=>{});

    const grpcHandler = child.fork('./Processes/grpcProcess')
    grpcHandler.send(packageData());
    grpcHandler.on('message', (data)=>{
        ipcHandler.send(data);
    })
}


function packageData(message = 'config')
{
    return dataPacket = [message, remote_ip, server_port]
}
