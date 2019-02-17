const grpc = require('grpc');
const ipc = require('node-ipc');
const child = require('child_process');
const ip = require('ip');

let local_ip = ip.address();
let remote_ip;
let server;
let listening_port = '4536';
let server_port = '2356';

const serviceDescription = require('./ProtoFiles/Comms_grpc_pb');
const dataLayout = require('./ProtoFiles/Comms_pb');

startServer();

function startServer()
{
    server = new grpc.Server();
    server.addService(serviceDescription.ConnectionCommsService, {
        hostDiscovery: hostDiscovery,
        intialConnection: intialConnection, //I know this is spelled wrong but I have to live with it for now
        keepAlive: keepAlive,
        disconnectNode: disconnectNode
    });
    server.bind(local_ip + ':' + listening_port, grpc.ServerCredentials.createInsecure());
    console.log("Node Server Started");
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

function intialConnection()
{

}

function keepAlive()
{

}

function disconnectNode()
{

}











function createServerHandlers()
{
    const ipcHandler = child.fork("./Processes/ipcProcess");
    //ipcHandler.send(1);
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
