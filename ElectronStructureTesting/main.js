const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const child_process = require('child_process');

//Hiding essential components from the garbage collector
let window;
let clock;

//Registering application listeners and callbacks for window events like startup and close
app.on('ready', createWindow);

app.on('window-all-closed', 
        ()=>{
            clock.send("exit");
            app.quit();
        })

app.on('activate',() => {
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

    spawnWorkerProcesses();
}



function spawnWorkerProcesses()
{   
    clock = child_process.fork('./NodeProcesses/ClockTest.js')
    clock.on("message", (data)=>{
        window.webContents.send('clock', data[1]);
        window.webContents.send('date', data[0]);
    });
    clock.on('error', ()=>
    {
        clock.send('restart')
    });

    // const listeningPost = child_process.fork('./NodeProcesses/RPCAssets/gRPCServer');
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


function keepAlive()
{

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