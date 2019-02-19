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
})

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

function createListItems(list)
{
    var list = document.createElement('ul');
    for(var i = 1; i < list.length - 1; i++)
    {
        var listItem = document.createElement('li');
        listItem.appendChild(list[i]);
        list.appendChild(listItem);
    }
    return list
}
