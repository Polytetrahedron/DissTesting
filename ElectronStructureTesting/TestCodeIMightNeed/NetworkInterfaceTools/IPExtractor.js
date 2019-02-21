
const os = require('os');
const ip = require('ip');
let networkInterfaceList;

class IPExtractor
{
    constructor()
    {
        //networkInterfaceList = os.networkInterfaces(); //returns all of the network interfaces in JSON like format
    }

    getIPAddress()
    {

        return ip.address(); //this is disgustingly annoying that this one line does what the 60 below it couldn't
        // networkInterfaceList = os.networkInterfaces();

        // for(var dev in networkInterfaceList)
        // {
        //     var item = networkInterfaceList[dev].filter(function(details)
        //     {
                
        //         return details;

        //     });

        // }

        // Object.keys(networkInterfaceList).forEach(function(iname)
        // {
        //     return iname;
        //     networkInterfaceList[iname].forEach(function(iface)
        //     {
        //         return iface;
        //         if(iface.family !== 'IPv4' || iface.internal !== false)
        //         {
        //             return iface;
        //         }
        //         else
        //         {
        //             return iface.address;

        //         }
        //     });
        // });
    }

    // getIPAddress()
    // {
    //     return os.networkInterfaces();
    //     // networkInterfaceList = os.networkInterfaces();
    //     // for(var dev in networkInterfaceList)
    //     // {
    //     //     var active = networkInterfaceList[dev].filter(function(ipAddress)
    //     //     {
    //     //         if(ipAddress.family === "IPv4" && ipAddress.internal === false)
    //     //         {
    //     //             return ipAddress.address
    //     //         }
    //     //         // if(active.length > 0)
    //     //         // {
    //     //         //     return networkInterfaces[0].address
    //     //         // }
    //     //     });
    //     // }
    // }
}
module.exports = IPExtractor