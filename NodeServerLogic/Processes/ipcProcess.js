const ipc = require('node-ipc')


process.on('message', (data)=>
{
    if(data == 1)
    {
        kickstartServer()
    }
    
})

let mark = ["mark", 'is' , 'cool']
function kickstartServer()
{
    ipc.config.id = 'node-server-handler';
    
    ipc.connectTo('mainExchange', () =>{
        callbackTest();
        // ipc.of.mainExchange.on('connect', ()=>{
        
        //     ipc.log("IPC service connected")
        //     for(var i = 0; i < 100; i++)
        //     {
        //         mark[3] = i
        //         ipc.of.mainExchange.emit('message', mark)  
        //     }
        // });

        // ipc.of.mainExchange.on('disconnect', ()=>
        // { 
        //     process.exit(1)
        // });
    });

    function callbackTest()
    {
        ipc.of.mainExchange.emit('message', mark)
    }
}