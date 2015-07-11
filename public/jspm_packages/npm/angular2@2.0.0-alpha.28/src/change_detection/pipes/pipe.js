/* */ 
'use strict';
var lang_1 = require("../../facade/lang");
var WrappedValue = (function() {
  function WrappedValue(wrapped) {
    this.wrapped = wrapped;
  }
  WrappedValue.wrap = function(value) {
    var w = _wrappedValues[_wrappedIndex++ % 5];
    w.wrapped = value;
    return w;
  };
  return WrappedValue;
})();
exports.WrappedValue = WrappedValue;
var _wrappedValues = [new WrappedValue(null), new WrappedValue(null), new WrappedValue(null), new WrappedValue(null), new WrappedValue(null)];
var _wrappedIndex = 0;
var BasePipe = (function() {
  function BasePipe() {}
  BasePipe.prototype.supports = function(obj) {
    return true;
  };
  BasePipe.prototype.onDestroy = function() {};
  BasePipe.prototype.transform = function(value) {
    return _abstract();
  };
  return BasePipe;
})();
exports.BasePipe = BasePipe;
function _abstract() {
  throw new lang_1.BaseException('This method is abstract');
}
exports.__esModule = true;
