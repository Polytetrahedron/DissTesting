import multiprocessing as mp
import ContentServer as content_server
import ClientStarter
from DataModules.FaceTesting import facecapture
from FTPLogic import FTPServer
from NetworkTools import IPExtractor
import sys

local_address = IPExtractor.extract_local_IP()

running_processes = []

def scan_clients():
    ClientStarter.run()

def create_content_server():
    content_server.serve(local_address)

def create_FTP_server():
        FTPServer.run(local_address)

def run_harness():
        content = mp.Process(target=create_content_server)
        running_processes.append(content)
        content.start()

        ftp = mp.Process(target=create_FTP_server)
        running_processes.append(ftp)
        ftp.start()

        client_scanner = mp.Process(target=scan_clients)
        running_processes.append(client_scanner)
        client_scanner.start()

        user_exit = input("Press any button to quit")
        if(user_exit != None):
                for processes in running_processes:
                        processes.join()
                sys.exit()


if __name__ == '__main__':
    run_harness()

