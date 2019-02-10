const grpc = require('grpc');
//need the services

let ip;
let port;
let server;

/**
 * When this process is created a message is sent to the process with the information needed to create 
 * the server for listening. This will allow this process to be used like an object in Java, Python or JS
 * as an available on demand server creator making it easier to create multiple servers on different ports
 * (If that's something that you would want in the future? idk just spitballing)
 */
process.on('message', (data)=>{
    
    if(data.length > 1)
    {
        ip = data[0];
        port = data[1] 

        createServer();
    }
    else
    {
        console.log("ERROR:" + process.title() + " ip malformed or data transfer error");
    }
});

/**
 * Server is created on provided port number and IP address enabling remote "clients" (the Python server)
 * to connect and access the methods exposed via this method. The intended usage of this listening server is 
 * to allow the server to scan for and connect to the clients at the edge of the network and therefor only requires
 * a single callback method. (Could I make this the keep alive process? That would be clever and cut down on the code
 * I'd have to write... I'll think about it)
 */
function createServer()
{
    server = new grpc.Server();
    server.addService();
    server.bind(ip + ":" + port);
    server.start();
}

// down here would be all of the callback function that would be needed in order to react to changes from the 
// server