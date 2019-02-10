import grpc
import concurrent
import socket
import subprocess

#These are the custom behavior modules
from DataModules import EmailModule, NewsModule, TimeModule, WeatherModule
from NetworkTools import IPExtractor

std_server_port = "5156"
std_listening_port = "7890"
local_dhcp_address = IPExtractor.extract_local_IP()

def serve():
    server = grpc.server(concurrent.futures.ThreadPoolExecutor(max_workers=10))
    #grpc interface 
    server.add_insecure_port(local_dhcp_address + ':' + std_server_port)
    server.start()