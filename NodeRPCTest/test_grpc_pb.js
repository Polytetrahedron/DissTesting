// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var test_pb = require('./test_pb.js');

function serialize_testRequest(arg) {
  if (!(arg instanceof test_pb.testRequest)) {
    throw new Error('Expected argument of type testRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_testRequest(buffer_arg) {
  return test_pb.testRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_testResponse(arg) {
  if (!(arg instanceof test_pb.testResponse)) {
    throw new Error('Expected argument of type testResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_testResponse(buffer_arg) {
  return test_pb.testResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var testServiceService = exports.testServiceService = {
  testSend: {
    path: '/testService/testSend',
    requestStream: false,
    responseStream: false,
    requestType: test_pb.testRequest,
    responseType: test_pb.testResponse,
    requestSerialize: serialize_testRequest,
    requestDeserialize: deserialize_testRequest,
    responseSerialize: serialize_testResponse,
    responseDeserialize: deserialize_testResponse,
  },
};

exports.testServiceClient = grpc.makeGenericClientConstructor(testServiceService);
