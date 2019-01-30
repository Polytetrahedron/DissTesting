const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const ClientClock = require('./NodeAssets/ClientClock');
const {ipcMain} = require('electron');
const child_process = require('child_process');

//Hiding essential components from the garbage collector
let window; // The render window that the user can see

//Registering application listeners and callbacks for window events like startup and close
app.on('ready', createWindow);

app.on('window-all-closed', 
        ()=>{
            app.quit();
        })

app.on('activate',() => {
        if(window == null)
            createWindow();
        })


//THis registers the listeners for the process communications
ipcMain.on('clock', (event, arg)=>
{
    newTime = time.checkTime();
    clientDate.setTime(newTime.getTime());
    event.sender.send('clock', clientDate.toLocaleTimeString());
});

ipcMain.on('date', (event, args)=>{
    //event.returnValue = clientDate.toLocaleDateString();
    event.sender.send('date', clientDate.toLocaleDateString());
});



function createWindow()
{
    window = new BrowserWindow({width:800, height:600});

    window.loadFile(__dirname + '/FrontendDisplay/index.html');

    window.on('closed', 
               ()=>{
                    window = null;
            })

    spawnWorkerProcesses();
}



function spawnWorkerProcesses()
{
    const clock = child_process.fork('./NodeProcesses/ClockTest.js')
    clock.on("message", (data)=>{
        window.webContents.send('clock', data[1]);
        window.webContents.send('date', data[0]);
    });
    clock.on('error', ()=>
    {
        clock.send('restart')
    });

    // const listeningPost = child_process.fork('./NodeProcesses/gRPCServer');
    // listeningPost.on('message', (data) =>
    // {
    //     //this will handle all of the main to server comms in a separate
    //     // process this will keep the main process responsive to input and changes 

    // });
    // listeningPost.on('disconnect', ()=>
    // {
    //     //attempt to restart the service 
    // });
}


//These can be moved into separate classes for neatness and readability but for now this will do
function acquireLocalIP() // this will be outsourced into a child process
{
    //This function will acquire the DHCP address of the client 

}

function keepAlive()
{

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
    // serverListener = grpc.Server();
    // serverListener.addProtoService() // This needs sorted
}

//need to handle the feedback from the main screen as well as send automatic updates to the main screen