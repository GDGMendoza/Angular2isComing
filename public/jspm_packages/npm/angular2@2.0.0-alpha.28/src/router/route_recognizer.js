/* */ 
'use strict';
var lang_1 = require("../facade/lang");
var collection_1 = require("../facade/collection");
var path_recognizer_1 = require("./path_recognizer");
var RouteRecognizer = (function() {
  function RouteRecognizer() {
    this.names = new collection_1.Map();
    this.matchers = new collection_1.Map();
    this.redirects = new collection_1.Map();
  }
  RouteRecognizer.prototype.addRedirect = function(path, target) {
    if (path == '/') {
      path = '';
    }
    this.redirects.set(path, target);
  };
  RouteRecognizer.prototype.addConfig = function(path, handler, alias) {
    if (alias === void 0) {
      alias = null;
    }
    var recognizer = new path_recognizer_1.PathRecognizer(path, handler);
    collection_1.MapWrapper.forEach(this.matchers, function(matcher, _) {
      if (recognizer.regex.toString() == matcher.regex.toString()) {
        throw new lang_1.BaseException("Configuration '" + path + "' conflicts with existing route '" + matcher.path + "'");
      }
    });
    this.matchers.set(recognizer.regex, recognizer);
    if (lang_1.isPresent(alias)) {
      this.names.set(alias, recognizer);
    }
    return recognizer.terminal;
  };
  RouteRecognizer.prototype.recognize = function(url) {
    var solutions = [];
    if (url.length > 0 && url[url.length - 1] == '/') {
      url = url.substring(0, url.length - 1);
    }
    collection_1.MapWrapper.forEach(this.redirects, function(target, path) {
      if (path == '/' || path == '') {
        if (path == url) {
          url = target;
        }
      } else if (lang_1.StringWrapper.startsWith(url, path)) {
        url = target + lang_1.StringWrapper.substring(url, path.length);
      }
    });
    collection_1.MapWrapper.forEach(this.matchers, function(pathRecognizer, regex) {
      var match;
      if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(regex, url))) {
        var matchedUrl = '/';
        var unmatchedUrl = '';
        if (url != '/') {
          matchedUrl = match[0];
          unmatchedUrl = lang_1.StringWrapper.substring(url, match[0].length);
        }
        solutions.push(new RouteMatch({
          specificity: pathRecognizer.specificity,
          handler: pathRecognizer.handler,
          params: pathRecognizer.parseParams(url),
          matchedUrl: matchedUrl,
          unmatchedUrl: unmatchedUrl
        }));
      }
    });
    return solutions;
  };
  RouteRecognizer.prototype.hasRoute = function(name) {
    return this.names.has(name);
  };
  RouteRecognizer.prototype.generate = function(name, params) {
    var pathRecognizer = this.names.get(name);
    return lang_1.isPresent(pathRecognizer) ? pathRecognizer.generate(params) : null;
  };
  return RouteRecognizer;
})();
exports.RouteRecognizer = RouteRecognizer;
var RouteMatch = (function() {
  function RouteMatch(_a) {
    var _b = _a === void 0 ? {} : _a,
        specificity = _b.specificity,
        handler = _b.handler,
        params = _b.params,
        matchedUrl = _b.matchedUrl,
        unmatchedUrl = _b.unmatchedUrl;
    this.specificity = specificity;
    this.handler = handler;
    this.params = params;
    this.matchedUrl = matchedUrl;
    this.unmatchedUrl = unmatchedUrl;
  }
  return RouteMatch;
})();
exports.RouteMatch = RouteMatch;
exports.__esModule = true;
