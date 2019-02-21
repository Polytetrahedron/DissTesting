let connectionStatus = false;
const grpc = require('grpc');
const datagram = require('../../JS-Protofile/attempt1_pb');
const serviceLayout = require('../../JS-Protofile/attempt1_grpc_pb');

class RPCListener
{
    constructor()

    createListener(address, port)
    {
        const listeningServer = new grpc.Server();
        listeningServer.addService(serviceLayout.testSendService, {
            
        });
        listeningServer.a
        
        server.bind(address + ":" + port, grpc.ServerCredentials.createInsecure())
        
        return listeningServer;
    }
}
module.exports = RPCListener;