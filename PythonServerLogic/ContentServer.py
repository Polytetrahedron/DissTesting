import grpc
from concurrent import futures
import multiprocessing
import socket
import time
import datetime
import ClientStarter

#These are the custom behavior modules
from DataModules import EmailModule, NewsModule, WeatherModule, CalendarModule
from NetworkTools import IPExtractor
import Comms_pb2, Comms_pb2_grpc

std_server_port = "2356"
local_dhcp_address = IPExtractor.extract_local_IP()

class ListeningServicer():
    def ClockData(self, request, context):
        print("Message Received: Time")
        current_server_time = datetime.datetime.now()
        curr_hour = current_server_time.hour
        curr_min = current_server_time.minute
        curr_second = current_server_time.second
        curr_day = current_server_time.day
        curr_month = current_server_time.month - 1
        curr_year = current_server_time.year
        return Comms_pb2.ClockResponse(hour=curr_hour, minute=curr_min, second=curr_second, day=curr_day, month=curr_month, year=curr_year)

    def EmailData(self, request, context):
        print("Message Received: Email")
        email_list = EmailModule.connect_to_mail_server()
        for email in email_list:
            response = Comms_pb2.EmailResponse(email=email)
            yield response

    def CalendarData(self, request, context):
        print("Message Received: Calendar")
        event_list = CalendarModule.get_calendar_events('User2')
        for event in event_list:
            response = Comms_pb2.CalendarResponse(events=event)
            yield response
    
    def WeatherData(self, request, context):
        print("Message Received: Weather")
        forecast = WeatherModule.get_weather('stirling')
        for weather in forecast:
            response = Comms_pb2.WeatherResponse(data=weather)
            yield response

    
    def NewsData(self, request, context):
        print("Message Received: News")
        recent_headlines = NewsModule.get_google_rss()
        for news in recent_headlines:
            response = Comms_pb2.NewsResponse(headline=news) # This is what was causing the serialization error... I'm an idiot...
            yield response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    Comms_pb2_grpc.add_ListeningCommsServicer_to_server(ListeningServicer(), server)
    server.add_insecure_port(local_dhcp_address + ':' + std_server_port)
    print("Server Started")
    ClientStarter.run();
    server.start()
    try:
        while True:
            time.sleep(3.0)
    except KeyboardInterrupt:
        server.stop(0)
