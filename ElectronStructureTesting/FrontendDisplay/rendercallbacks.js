const electron = require('electron');
const {ipcRenderer} = require('electron');

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
    listCreate(args, 'testNews');
});

ipcRenderer.on('weather', (event, args)=>
{
    listCreate(args, 'testWeather')
});

ipcRenderer.on('calendar', (event, args)=>
{
    listCreate(args, 'testEvents');
});

ipcRenderer.on('email', (event, args)=>
{
    listCreate(args, 'testEmail')
});

function listCreate(list, element)
{
    var htmlList = document.getElementById(element);
    var listItems = htmlList.childNodes;
    console.log(listItems.length)

    for(var i = 0, j = 1; i < listItems.length; i++)
    {
        if(list.length != j)
        {
           if(listItems[i].nodeType != 1)
            {
                continue
            }
            listItems[i].innerHTML = list[j];
            j++; 
        }
    }
}

