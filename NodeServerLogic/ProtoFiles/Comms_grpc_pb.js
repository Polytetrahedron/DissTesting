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

function serialize_ConnectionRequest(arg) {
  if (!(arg instanceof Comms_pb.ConnectionRequest)) {
    throw new Error('Expected argument of type ConnectionRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ConnectionRequest(buffer_arg) {
  return Comms_pb.ConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ConnectionResponse(arg) {
  if (!(arg instanceof Comms_pb.ConnectionResponse)) {
    throw new Error('Expected argument of type ConnectionResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ConnectionResponse(buffer_arg) {
  return Comms_pb.ConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ConnectionStatus(arg) {
  if (!(arg instanceof Comms_pb.ConnectionStatus)) {
    throw new Error('Expected argument of type ConnectionStatus');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ConnectionStatus(buffer_arg) {
  return Comms_pb.ConnectionStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ConnectionStatusResponse(arg) {
  if (!(arg instanceof Comms_pb.ConnectionStatusResponse)) {
    throw new Error('Expected argument of type ConnectionStatusResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ConnectionStatusResponse(buffer_arg) {
  return Comms_pb.ConnectionStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DisconnectRequest(arg) {
  if (!(arg instanceof Comms_pb.DisconnectRequest)) {
    throw new Error('Expected argument of type DisconnectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DisconnectRequest(buffer_arg) {
  return Comms_pb.DisconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DisconnectResponse(arg) {
  if (!(arg instanceof Comms_pb.DisconnectResponse)) {
    throw new Error('Expected argument of type DisconnectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DisconnectResponse(buffer_arg) {
  return Comms_pb.DisconnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DiscoverRequest(arg) {
  if (!(arg instanceof Comms_pb.DiscoverRequest)) {
    throw new Error('Expected argument of type DiscoverRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DiscoverRequest(buffer_arg) {
  return Comms_pb.DiscoverRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DiscoverResponse(arg) {
  if (!(arg instanceof Comms_pb.DiscoverResponse)) {
    throw new Error('Expected argument of type DiscoverResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DiscoverResponse(buffer_arg) {
  return Comms_pb.DiscoverResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
// This needs documented properly otherwise it'll just be a total mess
//
var ConnectionCommsService = exports.ConnectionCommsService = {
  //
  // This is the connection communications used for connecting and disconnectiing from
  // the server. These will be used by the client.
  intialConnection: {
    path: '/ConnectionComms/IntialConnection',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.ConnectionRequest,
    responseType: Comms_pb.ConnectionResponse,
    requestSerialize: serialize_ConnectionRequest,
    requestDeserialize: deserialize_ConnectionRequest,
    responseSerialize: serialize_ConnectionResponse,
    responseDeserialize: deserialize_ConnectionResponse,
  },
  keepAlive: {
    path: '/ConnectionComms/KeepAlive',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.ConnectionStatus,
    responseType: Comms_pb.ConnectionStatusResponse,
    requestSerialize: serialize_ConnectionStatus,
    requestDeserialize: deserialize_ConnectionStatus,
    responseSerialize: serialize_ConnectionStatusResponse,
    responseDeserialize: deserialize_ConnectionStatusResponse,
  },
  disconnectNode: {
    path: '/ConnectionComms/DisconnectNode',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.DisconnectRequest,
    responseType: Comms_pb.DisconnectResponse,
    requestSerialize: serialize_DisconnectRequest,
    requestDeserialize: deserialize_DisconnectRequest,
    responseSerialize: serialize_DisconnectResponse,
    responseDeserialize: deserialize_DisconnectResponse,
  },
  hostDiscovery: {
    path: '/ConnectionComms/HostDiscovery',
    requestStream: false,
    responseStream: false,
    requestType: Comms_pb.DiscoverRequest,
    responseType: Comms_pb.DiscoverResponse,
    requestSerialize: serialize_DiscoverRequest,
    requestDeserialize: deserialize_DiscoverRequest,
    responseSerialize: serialize_DiscoverResponse,
    responseDeserialize: deserialize_DiscoverResponse,
  },
};

exports.ConnectionCommsClient = grpc.makeGenericClientConstructor(ConnectionCommsService);
var ListeningCommsService = exports.ListeningCommsService = {
  //
  // These are all of the content RPC calls that the server will use to respond
  // to client inquests. Having two services is fine, right? hope so 
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
  emailData: {
    path: '/ListeningComms/EmailData',
    requestStream: false,
    responseStream: true,
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
    responseStream: true,
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
    responseStream: true,
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
    responseStream: true,
    requestType: Comms_pb.GenericRequest,
    responseType: Comms_pb.NewsResponse,
    requestSerialize: serialize_GenericRequest,
    requestDeserialize: deserialize_GenericRequest,
    responseSerialize: serialize_NewsResponse,
    responseDeserialize: deserialize_NewsResponse,
  },
};

exports.ListeningCommsClient = grpc.makeGenericClientConstructor(ListeningCommsService);
