const grpc = require('grpc');
const serviceDescription = require('../ProtoFiles/Comms_grpc_pb');
const dataLayout = require('../ProtoFiles/Comms_pb');


let serverIP;
let serverPort;
let client;

process.on('message', (data)=>
{
    if(data[0] == 'config')
    {
        serverIP = data[1];
        serverPort = data[2];
        createClient();
    }
});

function createClient()
{
    client = new serviceDescription.ListeningCommsClient(serverIP + ':' + serverPort, grpc.credentials.createInsecure());

    var testRequest = new dataLayout.GenericRequest();

    testRequest.setRequestdata("data please");

    client.timeData(testRequest, (err, response)=>{
        console.log(response.getHour() + " " + response.getMinute(), +" "+ response.getSecond());
    });

    client.dateData(testRequest, (err, response)=>{
        console.log("day: " + response.getDay() + "month: " + response.getMonth() + "year: " + response.getYear())
    });



    // for(var i = 0; i < 2)
    // {
    //     switch(i)
    //     {
    //         case 0:
    //             testRequest.setRequestData("data please");
    //             client.timeData(testRequest, function(err, response){
    //                 console.log(response.get)
    //             })
    //     }
    // }
}


 
// function sendTimeData()
// {

// }


// function main()
// {
//     const client = new grpc.Server();
//     client.addService(serviceDescription.ListeningCommsService, {
//         timeData:sendTimeData
//     });
//     client.bind(serverIP + ':' + serverPort);
//     client.start();
// }