import grpc
from NetworkTools import IPExtractor
from Scanners import ClientScanner
import Comms_pb2
import Comms_pb2_grpc 

discovery_port = "4536"

def run():
    ip = IPExtractor.extract_local_IP()
    potential_clients = ClientScanner.scan_for_clients(ip)

    #for i in potential_clients:
    with grpc.insecure_channel(ip + ":" + discovery_port) as channel:
        try:
            #grpc.channel_ready_future(channel).result(timeout=1)
            stub = Comms_pb2_grpc.ConnectionCommsStub(channel)
            response = stub.HostDiscovery(Comms_pb2.DiscoverRequest(server_ip=ip))
            print(response)
            # if response.DiscoverResponse == ip:
            #     print("Client found!")
                #break;
        except:
            print('Exception on grpc channel: No host at address:' + " " )
                