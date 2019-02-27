import multiprocessing as mp
import ContentServer as content_server
import ClientStarter
from DataModules.FaceTesting import facecapture
from FTPLogic import FTPServer

running_processes = []

def scan_clients():
    ClientStarter.run()

def create_content_server():
    content_server.serve()

def create_FTP_server():
        FTPServer.run()

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


if __name__ == '__main__':
    run_harness()

