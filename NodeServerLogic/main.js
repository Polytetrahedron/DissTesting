const grpc = require('grpc');
const ipc = require('node-ipc');
const child = require('child_process');

ipc.config.id = 'main-message-exchange';
ipc.config.retry = 1000;
ipc.config.silent = false;


ipc.serve(() => {
    
    ipc.server.on('message-exchange',(data, socket)=>{});
    
    ipc.server.on('test-exchange', (message) =>{});
    
    ipc.server.on('test', (message) =>{});
});

ipc.server.start()

// ipc.serve(
//     function(){
//         ipc.server.on(
//             'message',
//             function(data,socket){
//                 ipc.log('got a message : '.debug, data);
//                 ipc.server.emit(
//                     socket,
//                     'message',  //this can be anything you want so long as
//                                 //your client knows.
//                     data+' world!'
//                 );
//             }
//         );
//         ipc.server.on(
//             'socket.disconnected',
//             function(socket, destroyedSocketID) {
//                 ipc.log('client ' + destroyedSocketID + ' has disconnected!');
//             }
//         );
//     }
// );