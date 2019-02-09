import os
from pyftpdlib import handlers, servers, authorizers, filesystems

def main(ip:str):
    authorizer = authorizers.UnixAuthorizer(rejected_users=['root'], require_valid_shell=True)
    handler = handlers.FTPHandler
    handler.authorizer = authorizer
    handler.abstracted_fs = filesystems.UnixFilesystem
    server = servers.FTPServer((ip, 21), handler)
    server.serve_forever()