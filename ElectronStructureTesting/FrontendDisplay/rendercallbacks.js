const electron = require('electron');
const {ipcRenderer} = require('electron');
const process = require('process');

ipcRenderer.on('clock',(event, arg)=>
{
document.getElementById("test").innerHTML = arg;
});

ipcRenderer.on('date', (event, args)=>
{
    document.getElementById("datetest").innerHTML = args;
});

ipcRenderer.on('news', (event, args)=>
{
    console.log(args);
    listCreate(args, 'testNews');
    //document.getElementById("testList").innerHTML = hi;
});

ipcRenderer.on('weather', (event, args)=>{
    console.log(args)
    listCreate(args, 'testWeather')
});

ipcRenderer.on('calendar', (event, args)=>{
    listCreate(args, 'testEvents');
});

ipcRenderer.on('email', (event, args)=>{
    listCreate(args, 'testEmail')
});

function listCreate(list, element)
{
    var htmlList = document.getElementById(element);
    var listItems = htmlList.childNodes;
    console.log(listItems.length)

    for(var i = 0, j = 1; i < listItems.length; i++)
    {
        if(listItems[i].nodeType != 1)
        {
            continue
        }
        listItems[i].innerHTML = list[j];
        j++;
    }
}

