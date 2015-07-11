/* */ 
'use strict';
function __export(m) {
  for (var p in m)
    if (!exports.hasOwnProperty(p))
      exports[p] = m[p];
}
var di_1 = require("./di");
var http_1 = require("./src/http/http");
exports.Http = http_1.Http;
exports.HttpFactory = http_1.HttpFactory;
var xhr_backend_1 = require("./src/http/backends/xhr_backend");
exports.XHRBackend = xhr_backend_1.XHRBackend;
exports.XHRConnection = xhr_backend_1.XHRConnection;
var browser_xhr_1 = require("./src/http/backends/browser_xhr");
var base_request_options_1 = require("./src/http/base_request_options");
exports.BaseRequestOptions = base_request_options_1.BaseRequestOptions;
exports.RequestOptions = base_request_options_1.RequestOptions;
var mock_backend_1 = require("./src/http/backends/mock_backend");
exports.MockConnection = mock_backend_1.MockConnection;
exports.MockBackend = mock_backend_1.MockBackend;
var static_request_1 = require("./src/http/static_request");
exports.Request = static_request_1.Request;
var static_response_1 = require("./src/http/static_response");
exports.Response = static_response_1.Response;
var headers_1 = require("./src/http/headers");
exports.Headers = headers_1.Headers;
__export(require("./src/http/enums"));
var url_search_params_1 = require("./src/http/url_search_params");
exports.URLSearchParams = url_search_params_1.URLSearchParams;
exports.httpInjectables = [di_1.bind(browser_xhr_1.BrowserXHR).toValue(browser_xhr_1.BrowserXHR), xhr_backend_1.XHRBackend, base_request_options_1.BaseRequestOptions, di_1.bind(http_1.HttpFactory).toFactory(http_1.HttpFactory, [xhr_backend_1.XHRBackend, base_request_options_1.BaseRequestOptions]), http_1.Http];
exports.__esModule = true;
