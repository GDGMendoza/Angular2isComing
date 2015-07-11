/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  __.prototype = b.prototype;
  d.prototype = new __();
};
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
var enums_1 = require("./enums");
var di_1 = require("../../di");
var collection_1 = require("../facade/collection");
var RequestOptions = (function() {
  function RequestOptions(_a) {
    var _b = _a === void 0 ? {
      method: enums_1.RequestMethods.GET,
      mode: enums_1.RequestModesOpts.Cors
    } : _a,
        method = _b.method,
        headers = _b.headers,
        body = _b.body,
        mode = _b.mode,
        credentials = _b.credentials,
        cache = _b.cache;
    this.method = enums_1.RequestMethods.GET;
    this.mode = enums_1.RequestModesOpts.Cors;
    this.method = method;
    this.headers = headers;
    this.body = body;
    this.mode = mode;
    this.credentials = credentials;
    this.cache = cache;
  }
  RequestOptions.prototype.merge = function(opts) {
    if (opts === void 0) {
      opts = {};
    }
    return new RequestOptions(collection_1.StringMapWrapper.merge(this, opts));
  };
  return RequestOptions;
})();
exports.RequestOptions = RequestOptions;
var BaseRequestOptions = (function(_super) {
  __extends(BaseRequestOptions, _super);
  function BaseRequestOptions() {
    _super.call(this);
  }
  BaseRequestOptions = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], BaseRequestOptions);
  return BaseRequestOptions;
})(RequestOptions);
exports.BaseRequestOptions = BaseRequestOptions;
exports.__esModule = true;
