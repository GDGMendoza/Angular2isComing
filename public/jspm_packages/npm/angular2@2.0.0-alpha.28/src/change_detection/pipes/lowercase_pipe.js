/* */ 
'use strict';
var lang_1 = require("../../facade/lang");
var LowerCasePipe = (function() {
  function LowerCasePipe() {
    this._latestValue = null;
  }
  LowerCasePipe.prototype.supports = function(str) {
    return lang_1.isString(str);
  };
  LowerCasePipe.prototype.onDestroy = function() {
    this._latestValue = null;
  };
  LowerCasePipe.prototype.transform = function(value) {
    if (this._latestValue !== value) {
      this._latestValue = value;
      return lang_1.StringWrapper.toLowerCase(value);
    } else {
      return this._latestValue;
    }
  };
  return LowerCasePipe;
})();
exports.LowerCasePipe = LowerCasePipe;
var LowerCaseFactory = (function() {
  function LowerCaseFactory() {}
  LowerCaseFactory.prototype.supports = function(str) {
    return lang_1.isString(str);
  };
  LowerCaseFactory.prototype.create = function() {
    return new LowerCasePipe();
  };
  return LowerCaseFactory;
})();
exports.LowerCaseFactory = LowerCaseFactory;
exports.__esModule = true;
