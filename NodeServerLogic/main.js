const grpc = require('grpc');
const ipc = require('node-ipc');
const child = require('child_process');
const ip = require('ip');

let local_ip = ip.address();
let listening_port = '4536';
let server_port = '2356';


const ipcHandler = child.fork("./Processes/ipcProcess");
//ipcHandler.send(1);
ipcHandler.on('message', (data)=>{});

const grpcHandler = child.fork('./Processes/grpcProcess')
grpcHandler.send(packageData());
grpcHandler.on('message', (data)=>{
    ipcHandler.send(data);
})

function packageData(message = 'config')
{
    return dataPacket = [message, local_ip, server_port]
}

function clockToMirror()
{
    
}


