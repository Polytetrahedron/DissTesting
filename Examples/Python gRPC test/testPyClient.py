from __future__ import print_function
import grpc



def run():
    with grpc.insecure_channel('127.0.0.1:5151') as channel:
        stub = testprotofile_pb2_grpc.testServiceStub(channel)
        response = stub.testSend(testprotofile_pb2.testRequest(mark='mark mark mark!'))
    print("If this worked this should say something: " + response.markResponse)

if __name__ == '__main__':
    run()