const grpc = require('grpc');
const serviceDescription = require('../ProtoFiles/Comms_grpc_pb');
const dataLayout = require('../ProtoFiles/Comms_pb');


let serverIP;
let serverPort;
let client;
let sendRequest;
let startup = true;
let serverCall;

//These are te process communication callbacks for passing data
// into the process.
process.on('message', (data)=>
{
    if(data[0] === 'config')
    {
        serverIP = data[1];
        serverPort = data[2];
        //createClient();
    }
    else if(data[0] === 'sysCall')
    {
        if(data[1] === 'locked')
        {
            clearInterval(serverCall);
            process.send(data)
        }
        else if(data[1] === 'unlocked')
        {
            createClient(data[2]);
        }
    }
});

/**
 * This method creates a client and a client request. it also sets the polling rate and 
 * starts the polling of the server.
 * 
 * @param {*} user the user the data is for
 */
function createClient(user)
{
    client = new serviceDescription.ListeningCommsClient(serverIP + ':' + serverPort, grpc.credentials.createInsecure());

    sendRequest = new dataLayout.GenericRequest();

    sendRequest.setRequestdata(user);
    sendRequest.setRequestinghost("Data");

    pollingInterval = (Math.random() * 10000) + 120000
    console.log("polling server every: " + pollingInterval)

    pollForData();
    
    serverCall = setInterval(pollForData, pollingInterval);
}

/**
 * This is a handler method that calls all of the gRPC request methods
 */
function pollForData()
{
    if(startup === true)
    {
        getClockData();
        startup = false;
    }
    getHeadlines();
    getWeather();
    getCalendar();
    getEmails();
}

/**
 * This method sends a request to the server and gets a single response back
 * containing the time on the server
 */
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
    process.send(payload);
    });
}


/**
 * This sends a request to the server and captures a 
 * stream of gRPC responses
 */
function getHeadlines()
{
    var payload = ['news'];
    var dataCounter = 1;

    var stream = client.newsData(sendRequest);
    stream.on('data', (headline)=>{
        payload[dataCounter] = headline.getHeadline();
        ++dataCounter;
    });

    stream.on('error', ()=>{
        console.log('Error in stream!');
    })

    stream.on('end', ()=>{
        process.send(payload)
    })
}

/**
 * This sends a request to the server and captures a 
 * stream of gRPC responses
 */
function getWeather()
{
    var payload = ['weather'];
    dataCounter = 1;

    var stream = client.weatherData(sendRequest);
    stream.on('data', (forecast)=>{
        payload[dataCounter] = forecast.getData();
        ++dataCounter
    });

    stream.on('error', ()=>{
        console.log("Stream error: Retrying...")
    });

    stream.on('end', ()=>{
        process.send(payload)
    });
}

/**
 * This sends a request to the server and captures a 
 * stream of gRPC responses
 */
function getEmails()
{
    var payload = ['email'];
    var dataCounter = 1

    var stream = client.emailData(sendRequest);
    stream.on('data', (email)=>{
        payload[dataCounter] = email.getEmail();
        ++dataCounter;
    });

    stream.on('error', ()=>{
        console.log("Stream error!");
    });

    stream.on('end', ()=>{
        process.send(payload);
    });
}

/**
 * This sends a request to the server and captures a 
 * stream of gRPC responses
 */
function getCalendar()
{
    var payload = ['calendar'];
    var dataCounter = 1

    var stream = client.calendarData(sendRequest);
    stream.on('data', (events)=>{
        payload[dataCounter] = events.getEvents();
        ++dataCounter;
    });

    stream.on('error', ()=>{
        console.log("Stream error!");
    });

    stream.on('end', ()=>{
        process.send(payload);
    });
}