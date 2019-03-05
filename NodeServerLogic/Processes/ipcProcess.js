const ipc = require('node-ipc')


function sendPayload(payload, destination)
{
    ipc.of.mainExchange.emit('message', payload);
}


process.on('message', (data)=>
{
    startIPCService();
    sendPayload(data, data[0]);
});


function startIPCService()
{
    ipc.config.id = 'node-server-handler';
    ipc.config.maxRetries = 3;
    ipc.connectTo('mainExchange', () =>{});
}