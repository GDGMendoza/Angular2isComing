/* */ 
'use strict';
var base_response_options_1 = require("./base_response_options");
var lang_1 = require("../facade/lang");
var headers_1 = require("./headers");
var Response = (function() {
  function Response(_body, _a) {
    var _b = _a === void 0 ? base_response_options_1.baseResponseOptions : _a,
        status = _b.status,
        statusText = _b.statusText,
        headers = _b.headers,
        type = _b.type,
        url = _b.url;
    this._body = _body;
    if (lang_1.isJsObject(headers)) {
      headers = new headers_1.Headers(headers);
    }
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.type = type;
    this.url = url;
  }
  Response.prototype.blob = function() {
    throw new lang_1.BaseException('"blob()" method not implemented on Response superclass');
  };
  Response.prototype.json = function() {
    if (lang_1.isJsObject(this._body)) {
      return this._body;
    } else if (lang_1.isString(this._body)) {
      return lang_1.global.JSON.parse(this._body);
    }
  };
  Response.prototype.text = function() {
    return this._body.toString();
  };
  Response.prototype.arrayBuffer = function() {
    throw new lang_1.BaseException('"arrayBuffer()" method not implemented on Response superclass');
  };
  return Response;
})();
exports.Response = Response;
exports.__esModule = true;
