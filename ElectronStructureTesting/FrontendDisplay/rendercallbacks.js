const electron = require('electron');
const {ipcRenderer} = require('electron');
const process = require('process');
//const ipc = require('node-ipc');

// setInterval(runTest, 1000);

ipcRenderer.on('clock',(event, arg)=>{
document.getElementById("test").innerHTML = arg;
});

ipcRenderer.on('date', (event, args)=>{
    document.getElementById("shittest").innerHTML = args;
})


function runTest()
{

    ipcRenderer.send('debug-channel');
    ipcRenderer.send('date-debug');
    
}