/* */ 
'use strict';
var route_recognizer_1 = require("./route_recognizer");
var instruction_1 = require("./instruction");
var collection_1 = require("../facade/collection");
var async_1 = require("../facade/async");
var lang_1 = require("../facade/lang");
var route_config_impl_1 = require("./route_config_impl");
var reflection_1 = require("../reflection/reflection");
var RouteRegistry = (function() {
  function RouteRegistry() {
    this._rules = new collection_1.Map();
  }
  RouteRegistry.prototype.config = function(parentComponent, config) {
    assertValidConfig(config);
    var recognizer = this._rules.get(parentComponent);
    if (lang_1.isBlank(recognizer)) {
      recognizer = new route_recognizer_1.RouteRecognizer();
      this._rules.set(parentComponent, recognizer);
    }
    if (collection_1.StringMapWrapper.contains(config, 'redirectTo')) {
      recognizer.addRedirect(config['path'], config['redirectTo']);
      return;
    }
    config = collection_1.StringMapWrapper.merge(config, {'component': normalizeComponentDeclaration(config['component'])});
    var component = config['component'];
    var terminal = recognizer.addConfig(config['path'], config, config['as']);
    if (component['type'] == 'constructor') {
      if (terminal) {
        assertTerminalComponent(component['constructor'], config['path']);
      } else {
        this.configFromComponent(component['constructor']);
      }
    }
  };
  RouteRegistry.prototype.configFromComponent = function(component) {
    var _this = this;
    if (!lang_1.isType(component)) {
      return;
    }
    if (this._rules.has(component)) {
      return;
    }
    var annotations = reflection_1.reflector.annotations(component);
    if (lang_1.isPresent(annotations)) {
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];
        if (annotation instanceof route_config_impl_1.RouteConfig) {
          collection_1.ListWrapper.forEach(annotation.configs, function(config) {
            return _this.config(component, config);
          });
        }
      }
    }
  };
  RouteRegistry.prototype.recognize = function(url, parentComponent) {
    var _this = this;
    var componentRecognizer = this._rules.get(parentComponent);
    if (lang_1.isBlank(componentRecognizer)) {
      return async_1.PromiseWrapper.resolve(null);
    }
    var possibleMatches = componentRecognizer.recognize(url);
    var matchPromises = collection_1.ListWrapper.map(possibleMatches, function(candidate) {
      return _this._completeRouteMatch(candidate);
    });
    return async_1.PromiseWrapper.all(matchPromises).then(function(solutions) {
      var fullSolutions = collection_1.ListWrapper.filter(solutions, function(solution) {
        return lang_1.isPresent(solution);
      });
      if (fullSolutions.length > 0) {
        return mostSpecific(fullSolutions);
      }
      return null;
    });
  };
  RouteRegistry.prototype._completeRouteMatch = function(candidate) {
    var _this = this;
    return componentHandlerToComponentType(candidate.handler).then(function(componentType) {
      _this.configFromComponent(componentType);
      if (candidate.unmatchedUrl.length == 0) {
        return new instruction_1.Instruction({
          component: componentType,
          params: candidate.params,
          matchedUrl: candidate.matchedUrl,
          parentSpecificity: candidate.specificity
        });
      }
      return _this.recognize(candidate.unmatchedUrl, componentType).then(function(childInstruction) {
        if (lang_1.isBlank(childInstruction)) {
          return null;
        }
        return new instruction_1.Instruction({
          component: componentType,
          child: childInstruction,
          params: candidate.params,
          matchedUrl: candidate.matchedUrl,
          parentSpecificity: candidate.specificity
        });
      });
    });
  };
  RouteRegistry.prototype.generate = function(name, params, hostComponent) {
    var componentRecognizer = this._rules.get(hostComponent);
    return lang_1.isPresent(componentRecognizer) ? componentRecognizer.generate(name, params) : null;
  };
  return RouteRegistry;
})();
exports.RouteRegistry = RouteRegistry;
var ALLOWED_TARGETS = ['component', 'redirectTo'];
function assertValidConfig(config) {
  if (!collection_1.StringMapWrapper.contains(config, 'path')) {
    throw new lang_1.BaseException("Route config should contain a \"path\" property");
  }
  var targets = 0;
  collection_1.ListWrapper.forEach(ALLOWED_TARGETS, function(target) {
    if (collection_1.StringMapWrapper.contains(config, target)) {
      targets += 1;
    }
  });
  if (targets != 1) {
    throw new lang_1.BaseException("Route config should contain exactly one 'component', or 'redirectTo' property");
  }
}
var VALID_COMPONENT_TYPES = ['constructor', 'loader'];
function normalizeComponentDeclaration(config) {
  if (lang_1.isType(config)) {
    return {
      'constructor': config,
      'type': 'constructor'
    };
  } else if (lang_1.isStringMap(config)) {
    if (lang_1.isBlank(config['type'])) {
      throw new lang_1.BaseException("Component declaration when provided as a map should include a 'type' property");
    }
    var componentType = config['type'];
    if (!collection_1.ListWrapper.contains(VALID_COMPONENT_TYPES, componentType)) {
      throw new lang_1.BaseException("Invalid component type '" + componentType + "'");
    }
    return config;
  } else {
    throw new lang_1.BaseException("Component declaration should be either a Map or a Type");
  }
}
function componentHandlerToComponentType(handler) {
  var componentDeclaration = handler['component'],
      type = componentDeclaration['type'];
  if (type == 'constructor') {
    return async_1.PromiseWrapper.resolve(componentDeclaration['constructor']);
  } else if (type == 'loader') {
    var resolverFunction = componentDeclaration['loader'];
    return resolverFunction();
  } else {
    throw new lang_1.BaseException("Cannot extract the component type from a '" + type + "' component");
  }
}
function mostSpecific(instructions) {
  var mostSpecificSolution = instructions[0];
  for (var solutionIndex = 1; solutionIndex < instructions.length; solutionIndex++) {
    var solution = instructions[solutionIndex];
    if (solution.specificity > mostSpecificSolution.specificity) {
      mostSpecificSolution = solution;
    }
  }
  return mostSpecificSolution;
}
function assertTerminalComponent(component, path) {
  if (!lang_1.isType(component)) {
    return;
  }
  var annotations = reflection_1.reflector.annotations(component);
  if (lang_1.isPresent(annotations)) {
    for (var i = 0; i < annotations.length; i++) {
      var annotation = annotations[i];
      if (annotation instanceof route_config_impl_1.RouteConfig) {
        throw new lang_1.BaseException("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path.");
      }
    }
  }
}
exports.__esModule = true;
