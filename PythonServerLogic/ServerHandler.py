import multiprocessing as mp
import ContentServer as content_server

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
        content = mp.Process(target=create_content_server)
        running_processes.append(content)
        content.start()
#     client_scanner = mp.Process(target=scan_clients)
#     running_processes.append(client_scanner)
#     client_scanner.start()


if __name__ == '__main__':
    run_harness()

