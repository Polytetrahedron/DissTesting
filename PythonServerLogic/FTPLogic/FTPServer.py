import os
from pyftpdlib.authorizers import UnixAuthorizer 
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.filesystems import UnixFilesystem
from pyftpdlib.servers import FTPServer

# class CallbackHandler(handlers.FTPHandler):
#     def on_connect(self):
#         print("Client connected: " % self.remote_ip, self.remote_port)
    
#     def on_disconnect(self):
#         print("Client disconnected: " % self.remote_ip, self.remote_port)
    
    
    



def main():
    authorizer = UnixAuthorizer(rejected_users=['root'], require_valid_shell=False, anonymous_user='mark')
    handler = FTPHandler
    handler.authorizer = authorizer
    handler.abstracted_fs = UnixFilesystem
    
    server = FTPServer(('192.168.1.16', 21), handler)
    server.serve_forever()

main()