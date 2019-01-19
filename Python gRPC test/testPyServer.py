from concurrent import futures
import time

import grpc

import testprotofile_pb2
import testprotofile_pb2_grpc

class Test(testprotofile_pb2_grpc.testServiceServicer):

    def testSend(self, request, context):
        return testprotofile_pb2.testResponse(markResponse="I'm working, %s" % request.mark)

def serveRequest():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers = 10))
    testprotofile_pb2_grpc.add_testServiceServicer_to_server(Test(), server)
    server.add_insecure_port('127.0.0.1:5151')
    server.start()
    try:
        while True:
            time.sleep(3.0)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serveRequest()