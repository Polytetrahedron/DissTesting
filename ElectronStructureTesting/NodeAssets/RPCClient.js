const grpc = require('grpc')
let client;

const datagram = require('../JS-Protofile/attempt1_pb');
const serviceLayout = require('../JS-Protofile/attempt1_grpc_pb');

class RPCClient
{
    constructor(client)
    {
        this.client = client
    }

    testRPCClient()
    {
        var dataSend;
        client = new serviceLayout.testSendClient("127.0.0.1:5151", grpc.credentials.createInsecure());
        var mark = new datagram.Request();
    

        for (var i = 0; i < 4; i++) // dynamic typing sucks and I'm already over it 
        {
            switch(i)
            {
                case 0:
                    dataSend = "First";
                    break;
                case 1:
                    dataSend = "Second";
                    break;
                case 2:
                    dataSend = "Third";
                    break;
                case 3:
                    dataSend = "Fourth";;
                    break;
            }

            mark.setMark(dataSend); // sets the value of the field in the proto file
            client.sampleData(mark, function(err, response) //sends the request over RPC
            {
                console.log("Message: ", response.getMarkresponse())
            } );
        }
    }

    testReturn()
    {
        var ths = "i work like normal";
        return ths;
    }
    
}
module.exports = RPCClient
