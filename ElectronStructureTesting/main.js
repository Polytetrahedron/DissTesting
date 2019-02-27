const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const child_process = require('child_process');
const ipc = require('node-ipc')

//Hiding essential components from the garbage collector
let window;
let clock;
let locked = true;

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

    if(locked === false)
    {
        window.loadFile(__dirname + '/FrontendDisplay/index.html');
    }

    window.on('closed', 
               ()=>{
                    window = null;
            })

    startIPCServer();
}

function startIPCServer()
{
    ipc.config.id = 'mainExchange';
    ipc.config.retry = 1000;
    ipc.config.silent = false;


    ipc.serve(() => {

        ipc.server.on('connect', (data)=>{
            spawnWorkerProcesses();
        });
        
        ipc.server.on('message', (message) =>{
            messageExchange(message);
        });
    });

    ipc.server.start();
}

function spawnWorkerProcesses()
{   
    clock = child_process.fork('./NodeProcesses/Clock.js')
    clock.on("message", (data)=>{
        window.webContents.send('clock', data[1]);
        window.webContents.send('date', data[0]);
    });
    clock.on('error', ()=>
    {
        clock.send('restart')
    });
}


function messageExchange(data)
{
    messageID = data[0]

    if(messageID !== null)
    {
        if(messageID === "clock")
        {
            data[0] = 'start';
            clock.send(data);
        }
        else if(messageID === 'news') // These can be simplified to single IF statement but running out of time
        {
            sendToFront(messageID, data);
        }
        else if(messageID === 'email')
        {
            sendToFront(messageID, data);

        }
        else if(messageID === 'weather')
        {
            sendToFront(messageID, data);

        }
        else if(messageID === 'calendar')
        {
            sendToFront(messageID, data);
        }
        else if(messageID === 'sysCall')
        {
            if(data[1] === 'locked')
            {
                locked = true;
                window.loadFile('./FrontendDisplay/locked.html');
                window.reload(); //this needs tested again
            }
            else if(data[1] === 'unlocked')
            {
                locked = false;
                window.loadFile('./FrontendDisplay/index.html');
                window.reload(); // this needs tested again
            }
        }
    }
}

function sendToFront(channel, data)
{
    if(locked === false)
    {
        window.webContents.send(channel, data);
    }
}

