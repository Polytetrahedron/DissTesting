// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Comms_pb = require('./Comms_pb.js');

function serialize_CalendarResponse(arg) {
  if (!(arg instanceof Comms_pb.CalendarResponse)) {
    throw new Error('Expected argument of type CalendarResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_CalendarResponse(buffer_arg) {
  return Comms_pb.CalendarResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ClockResponse(arg) {
  if (!(arg instanceof Comms_pb.ClockResponse)) {
    throw new Error('Expected argument of type ClockResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ClockResponse(buffer_arg) {
  return Comms_pb.ClockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DateResponse(arg) {
  if (!(arg instanceof Comms_pb.DateResponse)) {
    throw new Error('Expected argument of type DateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DateResponse(buffer_arg) {
  return Comms_pb.DateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_EmailResponse(arg) {
  if (!(arg instanceof Comms_pb.EmailResponse)) {
    throw new Error('Expected argument of type EmailResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_EmailResponse(buffer_arg) {
  return Comms_pb.EmailResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GenericRequest(arg) {
  if (!(arg instanceof Comms_pb.GenericRequest)) {
    throw new Error('Expected argument of type GenericRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GenericRequest(buffer_arg) {
  return Comms_pb.GenericRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_NewsResponse(arg) {
  if (!(arg instanceof Comms_pb.NewsResponse)) {
    throw new Error('Expected argument of type NewsResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_NewsResponse(buffer_arg) {
  return Comms_pb.NewsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_WeatherResponse(arg) {
  if (!(arg instanceof Comms_pb.WeatherResponse)) {
    throw new Error('Expected argument of type WeatherResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_WeatherResponse(buffer_arg) {
  return Comms_pb.WeatherResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// *
// This will be a work in progress for all of the 
var ListeningCommsService = exports.ListeningCommsService = {
  clockData: {
    path: '/ListeningComms/ClockData',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.ClockResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_ClockResponse,
    responseDeserialize: deserialize_ClockResponse,
  },
  dateData: {
    path: '/ListeningComms/DateData',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.DateResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_DateResponse,
    responseDeserialize: deserialize_DateResponse,
  },
  emailData: {
    path: '/ListeningComms/EmailData',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.EmailResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_EmailResponse,
    responseDeserialize: deserialize_EmailResponse,
  },
  calendarData: {
    path: '/ListeningComms/CalendarData',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.CalendarResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_CalendarResponse,
    responseDeserialize: deserialize_CalendarResponse,
  },
  weatherData: {
    path: '/ListeningComms/WeatherData',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.WeatherResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_WeatherResponse,
    responseDeserialize: deserialize_WeatherResponse,
  },
  newsData: {
    path: '/ListeningComms/NewsData',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.NewsResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_NewsResponse,
    responseDeserialize: deserialize_NewsResponse,
  },
};

exports.ListeningCommsClient = grpc.makeGenericClientConstructor(ListeningCommsService);
