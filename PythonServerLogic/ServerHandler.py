import grpc
from concurrent import futures
import socket
import time
import datetime
import subprocess

#These are the custom behavior modules
from DataModules import EmailModule, NewsModule, TimeModule, WeatherModule
from NetworkTools import IPExtractor
import Comms_pb2, Comms_pb2_grpc

std_server_port = "2356"
std_listening_port = "7890"
local_dhcp_address = IPExtractor.extract_local_IP()
current_server_time = datetime.datetime.now()

class ListeningServicer():
    def TimeData(self, request, context):
        curr_hour = current_server_time.hour
        curr_min = current_server_time.minute
        curr_second = current_server_time.second

        return Comms_pb2.TimeResponse(hour=curr_hour, minute=curr_min, second=curr_second)

    def DateData(self, request, context):
        curr_day = current_server_time.day
        curr_month = current_server_time.month - 1
        curr_year = current_server_time.year
        
        return Comms_pb2.DateResponse(day= curr_day, month=curr_month, year=curr_year)

    def EmailData(self, request, context):
        pass

    def CalendarData(self, request, context):
        pass
    
    def WeatherData(self, request, context):
        pass
    
    def NewsData(self, request, context):
        pass

def serve():
    server = grpc.server(futures.ThreadPoolExecutor())
    Comms_pb2_grpc.add_ListeningCommsServicer_to_server(ListeningServicer(), server)
    server.add_insecure_port(local_dhcp_address + ':' + std_server_port)
    server.start()
    try:
        while True:
            time.sleep(3.0)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve() 