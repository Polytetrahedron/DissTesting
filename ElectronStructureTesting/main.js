const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const grpc = require('grpc');
const RPCListener = require('./NodeAssets/RPCListener');
const RPCClient = require('./NodeAssets/RPCClient')
const ClientClock = require('./NodeAssets/ClientClock');

//these are for protofiles
const datagram = require('./JS-Protofile/attempt1_pb');
const serviceLayout = require('./JS-Protofile/attempt1_grpc_pb');

//Hiding essential components from the garbage collector
let window; // The render window that the user can see
let client; // The RPC client that the allows connection to remote server
let serverListener;
let clientDate = new Date();
// let time = new ClientClock(clientDate.getHours(), clientDate.getMinutes(), clientDate.getSeconds(),
//                                 clientDate.getDate(), clientDate.getMonth(),clientDate.getFullYear());

let time = new ClientClock(23, 59, 30,
                                31, 11,2019);

//Registering application listeners for window events like startup and close
app.on('ready', createWindow);

app.on('window-all-closed', 
        ()=>{
            app.quit();
        })

app.on('activate',
        () =>{
        if(window == null)
            createWindow();
        })


function createWindow()
{
    window = new BrowserWindow({width:800, height:600});

    window.loadFile(__dirname + '/FrontendDisplay/index.html');

    window.on('closed', 
               ()=>{
                    window = null;
            })

    // const object = new RPCClient(client);
    // object.testRPCClient();
    // console.log(object.testReturn())
    setInterval(testDate, 500);
}


function testDate()
{
    newTime = time.checkTime();
    clientDate.setTime(newTime.getTime())

    console.log(clientDate.toLocaleDateString());
    console.log(clientDate.toLocaleTimeString());
}


//These can be moved into separate classes for neatness and readability but for now this will do
function acquireLocalIP()
{
    //This function will acquire the DHCP address of the client 

}

function scanForServer()
{
    //This can probably be set up to work with the server only this method may not be needed
}

/*
* This will create a "listening" server so that the server can signal changes and updates to the client
* These methods will allow for transfer of data such as time or other important signaling data such as 
* FTP transfers from the server i.e. training data for the face shit.
*/
function createServerListener()
{
    serverListener = grpc.Server();
    serverListener.addProtoService() // This needs sorted
}

//need to handle the feedback from the main screen as well as send automatic updates to the main screen