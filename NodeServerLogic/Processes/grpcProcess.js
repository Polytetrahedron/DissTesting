const grpc = require('grpc');
const serviceDescription = require('../ProtoFiles/Comms_grpc_pb');
const dataLayout = require('../ProtoFiles/Comms_pb');


let serverIP;
let serverPort;
let client;
let dataFlag1 = false;
let dataFlag2 = false;
let exitFlag = false;

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

    let payload = ['clock']

    client.timeData(testRequest, (err, response)=>{
        payload[1] = response.getHour();
        payload[2] = response.getMinute();
        payload[3] = response.getSecond();
        dataFlag1 = true;

        console.log(response.getHour() + " " + response.getMinute() +" "+ response.getSecond());
    });

    client.dateData(testRequest, (err, response)=>{

        payload[4] = response.getDay();
        payload[5] = response.getMonth();
        payload[6] = response.getYear();
        dataFlag2 = true;

        console.log("day: " + response.getDay() + "month: " + response.getMonth() + "year: " + response.getYear())
    });

    

    while(exitFlag === false)
    {
       if(dataFlag1 === true & dataFlag2 === true)
        {
            process.send(payload);
            exitFlag = true;
        } 
    }
    
}


function createListener()
{

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