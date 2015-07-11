/* */ 
'use strict';
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var di_1 = require("../../../di");
var static_request_1 = require("../static_request");
var enums_1 = require("../enums");
var Rx = require("rx");
var MockConnection = (function() {
  function MockConnection(req) {
    if (Rx.hasOwnProperty('default')) {
      this.response = new (Rx.default.Rx.Subject)();
    } else {
      this.response = new Rx.Subject();
    }
    this.readyState = enums_1.ReadyStates.OPEN;
    this.request = req;
    this.dispose = this.dispose.bind(this);
  }
  MockConnection.prototype.dispose = function() {
    if (this.readyState !== enums_1.ReadyStates.DONE) {
      this.readyState = enums_1.ReadyStates.CANCELLED;
    }
  };
  MockConnection.prototype.mockRespond = function(res) {
    if (this.readyState >= enums_1.ReadyStates.DONE) {
      throw new Error('Connection has already been resolved');
    }
    this.readyState = enums_1.ReadyStates.DONE;
    this.response.onNext(res);
    this.response.onCompleted();
  };
  MockConnection.prototype.mockDownload = function(res) {};
  MockConnection.prototype.mockError = function(err) {
    this.readyState = enums_1.ReadyStates.DONE;
    this.response.onError(err);
    this.response.onCompleted();
  };
  return MockConnection;
})();
exports.MockConnection = MockConnection;
var MockBackend = (function() {
  function MockBackend() {
    var _this = this;
    var Observable;
    this.connectionsArray = [];
    if (Rx.hasOwnProperty('default')) {
      this.connections = new Rx.default.Rx.Subject();
      Observable = Rx.default.Rx.Observable;
    } else {
      this.connections = new Rx.Subject();
      Observable = Rx.Observable;
    }
    this.connections.subscribe(function(connection) {
      return _this.connectionsArray.push(connection);
    });
    this.pendingConnections = Observable.fromArray(this.connectionsArray).filter(function(c) {
      return c.readyState < enums_1.ReadyStates.DONE;
    });
  }
  MockBackend.prototype.verifyNoPendingRequests = function() {
    var pending = 0;
    this.pendingConnections.subscribe(function(c) {
      return pending++;
    });
    if (pending > 0)
      throw new Error(pending + " pending connections to be resolved");
  };
  MockBackend.prototype.resolveAllConnections = function() {
    this.connections.subscribe(function(c) {
      return c.readyState = 4;
    });
  };
  MockBackend.prototype.createConnection = function(req) {
    if (!req || !(req instanceof static_request_1.Request)) {
      throw new Error("createConnection requires an instance of Request, got " + req);
    }
    var connection = new MockConnection(req);
    this.connections.onNext(connection);
    return connection;
  };
  MockBackend = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], MockBackend);
  return MockBackend;
})();
exports.MockBackend = MockBackend;
exports.__esModule = true;
