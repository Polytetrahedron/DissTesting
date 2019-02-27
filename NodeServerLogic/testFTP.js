const clientftp = require('ftp-client')

var config = {
    host: '192.168.1.46',
    port: 21
};
options = {logging: 'basic'}

client = new clientftp(config, options);

client.connect(()=>{
    client.download('/home/mark/Desktop/DissTesting/PythonServerLogic/DataModules/FaceTesting', 'TEst/',{overwrite: 'all'})
})