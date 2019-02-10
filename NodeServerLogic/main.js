const grpc = require('grpc');
const ipc = require('node-ipc');
const child = require('child_process');
const ip = require('ip');

let local_ip = ip.address();
let listening_port = '4536';
let server_port = '2356';


const ipcHandler = child.fork("./Processes/ipcProcess");
ipcHandler.send("hi");
ipcHandler.on('message', (data)=>{});



