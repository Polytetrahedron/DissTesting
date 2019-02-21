import grpc
import os
from NetworkTools import IPExtractor
from Scanners import ClientScanner
import Comms_pb2
import Comms_pb2_grpc 

discovery_port = "4536"
found_hosts = []

def run():
    ip = IPExtractor.extract_local_IP()
    potential_clients = ClientScanner.scan_for_clients(ip)

    for client in potential_clients:
        if client in found_hosts:
            resp = os.system('ping -n 1 ' + client)
            if resp == 0:
                attempt_client_connection(client)
                found_hosts.append(client)
                print("Host")
            else:
                print("No Host")

def attempt_client_connection(client_ip:str = '192.168.1.145'):

    with grpc.insecure_channel(client_ip + ":" + discovery_port) as channel:
        try:
            #grpc.channel_ready_future(channel).result(timeout=1)
            stub = Comms_pb2_grpc.ConnectionCommsStub(channel)
            response = stub.HostDiscovery(Comms_pb2.DiscoverRequest(server_ip=client_ip))
            print(response)
        except:
            print('Exception on grpc channel: No host at address:' + " " )
                
#run()