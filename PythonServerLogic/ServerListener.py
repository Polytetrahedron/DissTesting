import grpc
import multiprocessing as mp
import ServerHandler as content_server

running_processes = []

def scan_clients():
    for i in range(1, 1000000):
        print(i)

def create_content_server():
    content_server.serve()
    pass

def create_connection_manager():
    pass

def run_harness():
    client_scanner = mp.Process(target=scan_clients)
    running_processes.append(client_scanner)
    client_scanner.start()
    content = mp.Process(target=create_content_server)
    content.start()

if __name__ == '__main__':
    run_harness()

