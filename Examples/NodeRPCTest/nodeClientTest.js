const grpc = require('grpc');
// const proto_path = __dirname + '/protoFiles/test.proto';
// const protoloader = require('@grpc/proto-loader');
// const packageDefinition = protoloader.loadSync(proto_path, {keepCase: true,
// longs:String,
// enums: String,
// defaults: true,
// oneofs:true});
// var testDynamicProto = grpc.loadPackageDefinition(packageDefinition).testproto;

const data = require('./test_pb');
const service = require('./test_grpc_pb')

function main()
{
    var client = new service.testServiceClient('127.0.0.1:5151',
    grpc.credentials.createInsecure());

    var request = new data.testRequest();
    var user;
    if(process.argv.length >= 3)
    {
        user = process.argv[2];
    }
    else
    {
        user = 'Mark Test';
    }

    request.setMark(user);
    client.testSend(request, function(err, response){
        console.log("Please work", response.getMarkresponse());
    });
}

main();