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
    getWeather();
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
    //console.log(response.getHour() + " " + response.getMinute() +" "+ response.getSecond());
    process.send(payload);
    });
}


function getHeadlines()
{
    var payload = ['news'];
    var dataCounter = 1;

    var stream = client.newsData(sendRequest);
    stream.on('data', (headline)=>{
        payload[dataCounter] = headline.getHeadline();
        ++dataCounter;
        //console.log(payload);
    });

    stream.on('error', ()=>{
        console.log('Error in stream!');
        getHeadlines();
    })

    stream.on('end', ()=>{
        process.send(payload)
    })


}

function getWeather()
{
    var payload = ['weather'];
    var dataCounter = 1

    var stream = client.weatherData(sendRequest);
    stream.on('data', (forecast)=>{
        payload[dataCounter] = forecast.getData();
        ++dataCounter;
    });

    stream.on('error', ()=>{
        console.log("Stream error: Retrying...")
        getWeather();
    });

    stream.on('end', ()=>{
        process.send(payload)
    })
}

function getEmails()
{

}

function getEvents()
{
    
}