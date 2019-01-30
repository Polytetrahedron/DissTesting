let connectionStatus = false;
const grpc = require('grpc');
const datagram = require('../JS-Protofile/attempt1_pb');
const serviceLayout = require('../JS-Protofile/attempt1_grpc_pb');

class RPCListener
{
    constructor()

    createListener()
    {
        const listeningServer = new grpc.Server();
        listeningServer.addProtoService(serviceLayout.testSendService);
        
        return listeningServer;
    }

    




}
module.exports = RPCListener;