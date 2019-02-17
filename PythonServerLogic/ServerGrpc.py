import grpc
from NetworkTools import IPExtractor
from Scanners import ClientScanner
import Comms_pb2
import Comms_pb2_grpc

def run():
    ip = IPExtractor.extract_local_IP()

    potential_clients = []

    for i in potential_clients:
        with grpc.insecure_channel('') as channel:
            try:
                stub = Comms_pb2_grpc.ConnectionCommsStub(channel)
                response = stub.HostDiscovery(Comms_pb2.DiscoverRequest(server_ip=ip))
                if response.DiscoverResponse == ip:
                    pass
            except:
                print('Exception on grpc channel: No host at address!')
                continue