/* */ 
'use strict';
var enums_1 = require("./enums");
var headers_1 = require("./headers");
var Request = (function() {
  function Request(url, _a) {
    var _b = _a === void 0 ? {} : _a,
        body = _b.body,
        _c = _b.method,
        method = _c === void 0 ? enums_1.RequestMethods.GET : _c,
        _d = _b.mode,
        mode = _d === void 0 ? enums_1.RequestModesOpts.Cors : _d,
        _e = _b.credentials,
        credentials = _e === void 0 ? enums_1.RequestCredentialsOpts.Omit : _e,
        _f = _b.headers,
        headers = _f === void 0 ? new headers_1.Headers() : _f;
    this.url = url;
    this._body = body;
    this.method = method;
    this.mode = mode;
    this.credentials = credentials;
    this.headers = headers;
  }
  Request.prototype.text = function() {
    return this._body ? this._body.toString() : '';
  };
  return Request;
})();
exports.Request = Request;
exports.__esModule = true;
