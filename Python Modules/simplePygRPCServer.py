from concurrent import futures
import time
import grpc
import attempt1_pb2
import attempt1_pb2_grpc
import socket

# simple sending server to test comms from back end server to front end client.
# This will be flashed out when the functionality is addressed in the coming months 

class Test(attempt1_pb2_grpc.testSendServicer):

    def sampleData(self, request, context):
        mark = []
        for i in range(0,100):
            mark.append(i)
            yidd = socket.gethostbyname(socket.gethostname())
            print(yidd)
        return attempt1_pb2.Response(markResponse=str(mark))

def serveRequest():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers = 10))
    attempt1_pb2_grpc.add_testSendServicer_to_server(Test(), server)
    server.add_insecure_port('127.0.0.1:5151')
    server.start()
    try:
        while True:
            time.sleep(3.0)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serveRequest()