import os
from pyftpdlib import handlers, servers, authorizers, filesystems

class CallbackHandler(handlers.FTPHandler):
    def on_connect(self):
        print("Client connected: " % self.remote_ip, self.remote_port)
    
    def on_disconnect(self):
        print("Client disconnected: " % self.remote_ip, self.remote_port)
    
    
    



def main(ip:str):
    authorizer = authorizers.UnixAuthorizer(rejected_users=['root'], require_valid_shell=False, anonymous_user='mark')
    handler = handlers.FTPHandler
    handler.authorizer = authorizer
    handler.abstracted_fs = filesystems.UnixFilesystem
    
    server = servers.FTPServer((ip, 21), handler)
    server.serve_forever()