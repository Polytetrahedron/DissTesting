const ipc = require('node-ipc')

/**
 * This is the send method for sending IPC messages to the 
 * Electron main process.
 * @param {*} payload the data to be transmitted
 * @param {*} destination the channel it is to be sent to
 */
function sendPayload(payload, destination)
{
    ipc.of.mainExchange.emit('message', payload);
}

//messaging callback
process.on('message', (data)=>
{
    startIPCService();
    sendPayload(data, data[0]);
});

/**
 * initiates the connection to the message exchange
 */
function startIPCService()
{
    ipc.config.id = 'node-server-handler';
    ipc.config.maxRetries = 3;
    ipc.connectTo('mainExchange', () =>{});
}