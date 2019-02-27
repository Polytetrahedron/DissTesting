import os
from pyftpdlib.authorizers import UnixAuthorizer 
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.filesystems import UnixFilesystem
from pyftpdlib.servers import FTPServer


def run(ip:str = None):
    authorizer = UnixAuthorizer(allowed_users=['mark'], require_valid_shell=False, anonymous_user='mark', global_perm='elradfmwM')
    handler = FTPHandler
    handler.authorizer = authorizer
    handler.abstracted_fs = UnixFilesystem
    server = FTPServer((ip, 21), handler)
    server.serve_forever()
