const ipc = require('node-ipc')




function kickstart_server()
{
    ipc.config.id = 'node-server-handler';
    
    ipc.connectTo('main-message-exchange');
}