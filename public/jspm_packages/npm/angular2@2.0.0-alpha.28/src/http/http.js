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
var decorators_1 = require("../di/decorators");
var static_request_1 = require("./static_request");
var xhr_backend_1 = require("./backends/xhr_backend");
var base_request_options_1 = require("./base_request_options");
var enums_1 = require("./enums");
var Rx = require("rx");
function httpRequest(backend, request) {
  return (Observable.create(function(observer) {
    var connection = backend.createConnection(request);
    var internalSubscription = connection.response.subscribe(observer);
    return function() {
      internalSubscription.dispose();
      connection.dispose();
    };
  }));
}
var Http = (function() {
  function Http(_backend, _defaultOptions) {
    this._backend = _backend;
    this._defaultOptions = _defaultOptions;
  }
  Http.prototype.request = function(url, options) {
    if (typeof url === 'string') {
      return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options)));
    } else if (url instanceof static_request_1.Request) {
      return httpRequest(this._backend, url);
    }
  };
  Http.prototype.get = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options).merge({method: enums_1.RequestMethods.GET})));
  };
  Http.prototype.post = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options).merge({
      body: body,
      method: enums_1.RequestMethods.POST
    })));
  };
  Http.prototype.put = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options).merge({
      body: body,
      method: enums_1.RequestMethods.PUT
    })));
  };
  Http.prototype.delete = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options).merge({method: enums_1.RequestMethods.DELETE})));
  };
  Http.prototype.patch = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options).merge({
      body: body,
      method: enums_1.RequestMethods.PATCH
    })));
  };
  Http.prototype.head = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(url, this._defaultOptions.merge(options).merge({method: enums_1.RequestMethods.HEAD})));
  };
  Http = __decorate([decorators_1.Injectable(), __metadata('design:paramtypes', [xhr_backend_1.XHRBackend, base_request_options_1.BaseRequestOptions])], Http);
  return Http;
})();
exports.Http = Http;
var Observable;
if (Rx.hasOwnProperty('default')) {
  Observable = Rx.default.Rx.Observable;
} else {
  Observable = Rx.Observable;
}
function HttpFactory(backend, defaultOptions) {
  return function(url, options) {
    if (typeof url === 'string') {
      return httpRequest(backend, new static_request_1.Request(url, defaultOptions.merge(options)));
    } else if (url instanceof static_request_1.Request) {
      return httpRequest(backend, url);
    }
  };
}
exports.HttpFactory = HttpFactory;
exports.__esModule = true;
