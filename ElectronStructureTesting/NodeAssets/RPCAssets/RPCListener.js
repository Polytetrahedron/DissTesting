let connectionStatus = false;
const grpc = require('grpc');
const datagram = require('../../JS-Protofile/attempt1_pb');
const serviceLayout = require('../../JS-Protofile/attempt1_grpc_pb');
const ip = require('ip');

//create a server 
//register callbacks
//send data to main process
class RPCListener
{
    constructor()

    createListener(port)
    {
        const listeningServer = new grpc.Server();
        listeningServer.addProtoService(serviceLayout.testSendService);
        
        server.bind(ip.address() + ":" + port, grpc.ServerCredentials.createInsecure())
        
        return listeningServer;
    }

    




}
module.exports = RPCListener;