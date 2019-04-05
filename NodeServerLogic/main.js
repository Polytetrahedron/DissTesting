const grpc = require('grpc');
const ipc = require('node-ipc');
const child = require('child_process');
const ip = require('ip');
const clientftp = require('ftp-client')

let local_ip = ip.address();
let remote_ip;
let server;
let listening_port = '4536';
let server_port = '2356';
let currentUser = null;
let grpcHandler;
let ipcHandler;
let timeout;
let active = false;


const serviceDescription = require('./ProtoFiles/Comms_grpc_pb');
const dataLayout = require('./ProtoFiles/Comms_pb');

startServer();

/**
 * This the the Main Listening server for the client
 */
function startServer()
{
    server = new grpc.Server();
    server.addService(serviceDescription.ConnectionCommsService, {
        hostDiscovery: hostDiscovery,
        faceUnlock: faceUnlock,
        fTPConnection: fTPConnection,
        disconnectNode: disconnectNode,
        fTPInitialize: fTPInitialize
    });
    server.bind(local_ip + ':' + listening_port, grpc.ServerCredentials.createInsecure());
    console.log("Node Server Started: Waiting for Server");
    server.start();
}

/**
 * This is the host discover method that allows for a mirror to become
 * active
 * 
 * @param {*} call 
 * @param {*} callback 
 */
function hostDiscovery(call, callback)
{
    console.log("Message Received: Discovery!");
    var reply = new dataLayout.DiscoverResponse();
   
    reply.setServerIp(local_ip);
    
    remote_ip = call.request.getServerIp();
    
    if(remote_ip != null)
    {
        createServerHandlers();
        active = true;
        console.log(remote_ip);
    }
    callback(null, reply);
}

/**
 * This is the is the logic for locking and unlocking the mirror
 * via facial recognition
 * 
 * @param {*} call 
 * @param {*} callback 
 */
function faceUnlock(call, callback)
{
    var reply = new dataLayout.UnlockResponse();
    reply.setUser('received')
    requestedUser = call.request.getUser();

    if(active === true)
    {
        clearTimeout(timeout)
        timeout = setTimeout(lockMirror, 65000);
    }
  

    if (currentUser != requestedUser && active === true)
    {
        currentUser = requestedUser;
        sendMessage = ['sysCall', 'unlocked', currentUser];
        grpcHandler.send(sendMessage);
        ipcHandler.send(sendMessage)
    }
    else if(active === true && currentUser === requestedUser)
    {
        sendMessage = ['sysCall', 'unlocked', currentUser];
        grpcHandler.send(sendMessage);
        ipcHandler.send(sendMessage)
    }
    console.log("received unlock " + currentUser)
    
    callback(null, reply);
}

/**
 * 
 */
function fTPInitialize()
{
    // Not implemented Not needed will remove next iteration
}

/**
 * This is the FTP download logic that connects to the server
 * and downloads te training data
 * 
 * @param {*} call 
 * @param {*} callback 
 */
function fTPConnection(call, callback)
{
    if(remote_ip != null)
    {
        console.log("Starting FTP Transaction")
        var config = { host: remote_ip, port: 21};
        var options = {logging: 'basic'};
        
        client = new clientftp(config, options);
        
        client.connect(()=>{
            client.download('/home/mark/Desktop/DissTesting/PythonServerLogic/TrainingData', '/home/mark/Desktop',{overwrite: 'all'})
        }); 
    }
}

/**
 *  Currently not implemented 
 * @param {*} call 
 * @param {*} callback 
 */
function disconnectNode(call, callback)
{
    active = false;
    lockMirror();
}

/**
 *  This method spawns the gRPC and IPC processes
 */
function createServerHandlers()
{
    ipcHandler = child.fork("./Processes/ipcProcess");
    ipcHandler.on('message', (data)=>{});

    grpcHandler = child.fork('./Processes/grpcProcess')
    grpcHandler.send(packageData());
    grpcHandler.on('message', (data)=>{
        ipcHandler.send(data);
    })
}

/**
 * This is the logic for locking the mirror
 */
function lockMirror()
{
    console.log("Locking Mirror")
    sysCall = ['sysCall', 'locked'];
    grpcHandler.send(sysCall);
    ipcHandler.send(sysCall)
}

/**
 * This method encapsulates the network data
 * in order to pass it into the processes
 * @param {*} message 
 */
function packageData(message = 'config')
{
    return dataPacket = [message, remote_ip, server_port]
}
