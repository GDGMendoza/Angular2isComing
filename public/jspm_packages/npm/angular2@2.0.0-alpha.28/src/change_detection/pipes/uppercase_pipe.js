/* */ 
'use strict';
var lang_1 = require("../../facade/lang");
var UpperCasePipe = (function() {
  function UpperCasePipe() {
    this._latestValue = null;
  }
  UpperCasePipe.prototype.supports = function(str) {
    return lang_1.isString(str);
  };
  UpperCasePipe.prototype.onDestroy = function() {
    this._latestValue = null;
  };
  UpperCasePipe.prototype.transform = function(value) {
    if (this._latestValue !== value) {
      this._latestValue = value;
      return lang_1.StringWrapper.toUpperCase(value);
    } else {
      return this._latestValue;
    }
  };
  return UpperCasePipe;
})();
exports.UpperCasePipe = UpperCasePipe;
var UpperCaseFactory = (function() {
  function UpperCaseFactory() {}
  UpperCaseFactory.prototype.supports = function(str) {
    return lang_1.isString(str);
  };
  UpperCaseFactory.prototype.create = function() {
    return new UpperCasePipe();
  };
  return UpperCaseFactory;
})();
exports.UpperCaseFactory = UpperCaseFactory;
exports.__esModule = true;
