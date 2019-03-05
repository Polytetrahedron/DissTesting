// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var attempt1_pb = require('./attempt1_pb.js');

function serialize_Request(arg) {
  if (!(arg instanceof attempt1_pb.Request)) {
    throw new Error('Expected argument of type Request');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Request(buffer_arg) {
  return attempt1_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Response(arg) {
  if (!(arg instanceof attempt1_pb.Response)) {
    throw new Error('Expected argument of type Response');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Response(buffer_arg) {
  return attempt1_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var testSendService = exports.testSendService = {
  sampleData: {
    path: '/testSend/sampleData',
    requestStream: false,
    responseStream: false,
    requestType: attempt1_pb.Request,
    responseType: attempt1_pb.Response,
    requestSerialize: serialize_Request,
    requestDeserialize: deserialize_Request,
    responseSerialize: serialize_Response,
    responseDeserialize: deserialize_Response,
  },
};

exports.testSendClient = grpc.makeGenericClientConstructor(testSendService);
