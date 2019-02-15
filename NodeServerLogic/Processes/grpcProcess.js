const grpc = require('grpc');
const serviceDescription = require('../ProtoFiles/Comms_grpc_pb');
const dataLayout = require('../ProtoFiles/Comms_pb');


let serverIP;
let serverPort;
let client;
let sendRequest; // this can be generic as the method being called is the method that dictates the returned data not the request itself


//TODO this needs fixed like pronto
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

    sendRequest = new dataLayout.GenericRequest();

    sendRequest.setRequestdata("data please");

    getClockData();
    getHeadlines();
}

function getClockData()
{
    var payload = ['clock']

    client.clockData(sendRequest, (err, response)=>{
    payload[1] = response.getHour();
    payload[2] = response.getMinute();
    payload[3] = response.getSecond();
    payload[4] = response.getDay();
    payload[5] = response.getMonth();
    payload[6] = response.getYear();

    console.log(response.getHour() + " " + response.getMinute() +" "+ response.getSecond());

    process.send(payload);
    });
}


function getHeadlines()
{
    var payload = ['news'];

    var stream = client.newsData(sendRequest)
    stream.on('data', (headline)=>{
        console.log(headline);
    });


}


function createListener()
{

}