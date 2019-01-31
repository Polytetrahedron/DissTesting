
const os = require('os');
const networkInterfaces =os.networkInterfaces();

class IPExtractor
{
    constructor()
    {
        //networkInterfaces = os.networkInterfaces(); //returns all of the network interfaces in JSON like format
    }

    getIPAddress()
    {
        "use strict";

        Object.keys(networkInterfaces).forEach(function(){

            networkInterfaces[interfaceName].forEach(function(interface)
            {
                if(interface.family === 'IPv4' || interface.internal === false)
                {
                    return interface.address;
                }
                else
                {
                    return "unable to get IP";
                }
            });
        });
    }

}
module.exports = IPExtractor