/* */ 
'use strict';
var collection_1 = require("../facade/collection");
var lang_1 = require("../facade/lang");
var RouteParams = (function() {
  function RouteParams(params) {
    this.params = params;
  }
  RouteParams.prototype.get = function(param) {
    return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.params, param));
  };
  return RouteParams;
})();
exports.RouteParams = RouteParams;
var Instruction = (function() {
  function Instruction(_a) {
    var _b = _a === void 0 ? {} : _a,
        params = _b.params,
        component = _b.component,
        child = _b.child,
        matchedUrl = _b.matchedUrl,
        parentSpecificity = _b.parentSpecificity;
    this.reuse = false;
    this.capturedUrl = matchedUrl;
    this.accumulatedUrl = matchedUrl;
    this.specificity = parentSpecificity;
    if (lang_1.isPresent(child)) {
      this.child = child;
      this.specificity += child.specificity;
      var childUrl = child.accumulatedUrl;
      if (lang_1.isPresent(childUrl)) {
        this.accumulatedUrl += childUrl;
      }
    } else {
      this.child = null;
    }
    this.component = component;
    this.params = params;
  }
  Instruction.prototype.hasChild = function() {
    return lang_1.isPresent(this.child);
  };
  Instruction.prototype.reuseComponentsFrom = function(oldInstruction) {
    var nextInstruction = this;
    while (nextInstruction.reuse = shouldReuseComponent(nextInstruction, oldInstruction) && lang_1.isPresent(oldInstruction = oldInstruction.child) && lang_1.isPresent(nextInstruction = nextInstruction.child))
      ;
  };
  return Instruction;
})();
exports.Instruction = Instruction;
function shouldReuseComponent(instr1, instr2) {
  return instr1.component == instr2.component && collection_1.StringMapWrapper.equals(instr1.params, instr2.params);
}
exports.__esModule = true;
