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
var lang_1 = require("../../facade/lang");
var pipe_1 = require("./pipe");
var JsonPipe = (function(_super) {
  __extends(JsonPipe, _super);
  function JsonPipe() {
    _super.apply(this, arguments);
  }
  JsonPipe.prototype.transform = function(value) {
    return lang_1.Json.stringify(value);
  };
  JsonPipe.prototype.create = function(cdRef) {
    return this;
  };
  return JsonPipe;
})(pipe_1.BasePipe);
exports.JsonPipe = JsonPipe;
exports.__esModule = true;
