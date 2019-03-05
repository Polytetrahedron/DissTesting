import grpc
import os
from NetworkTools import IPExtractor
from Scanners import ClientScanner
import Comms_pb2
import Comms_pb2_grpc 
import json

discovery_port = "4536"
found_hosts = []
save_hosts = {}

ip = IPExtractor.extract_local_IP()

def run():
    potential_clients = ClientScanner.scan_for_clients(ip)

    for client in potential_clients:
        if client not in found_hosts:
            resp = os.system('ping -n 1 ' + client) # this will be -c for unix systems change this
            if resp == 0:
                attempt_client_connection(client)
                print("Host")
            else:
                print("No Host")


def attempt_client_connection(client_ip:str = '192.168.1.145'):

    with grpc.insecure_channel(client_ip + ":" + discovery_port) as channel:
        try:
            #grpc.channel_ready_future(channel).result(timeout=1)
            stub = Comms_pb2_grpc.ConnectionCommsStub(channel)
            response = stub.HostDiscovery(Comms_pb2.DiscoverRequest(server_ip=ip))
            found_hosts.append(client_ip)
            save_hosts['host_addresses'] = found_hosts

        except:
            print('Exception on grpc channel: No rpc host at address: ' + client_ip )
    with open('active_hosts.json', 'w') as hosts_file:
        json.dump(save_hosts, hosts_file)
                
#run()