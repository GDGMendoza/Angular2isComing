/* */ 
'use strict';
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var annotations_1 = require("../core/annotations/annotations");
var decorators_1 = require("../core/annotations/decorators");
var core_1 = require("../../core");
var collection_1 = require("../facade/collection");
var lang_1 = require("../facade/lang");
var router_1 = require("./router");
var location_1 = require("./location");
var api_1 = require("../render/api");
var RouterLink = (function() {
  function RouterLink(_elementRef, _router, _location, _renderer) {
    this._elementRef = _elementRef;
    this._router = _router;
    this._location = _location;
    this._renderer = _renderer;
    this._params = collection_1.StringMapWrapper.create();
  }
  Object.defineProperty(RouterLink.prototype, "route", {
    set: function(changes) {
      this._route = changes;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RouterLink.prototype, "params", {
    set: function(changes) {
      this._params = changes;
    },
    enumerable: true,
    configurable: true
  });
  RouterLink.prototype.onClick = function() {
    this._router.navigate(this._navigationHref);
    return false;
  };
  RouterLink.prototype.onAllChangesDone = function() {
    if (lang_1.isPresent(this._route) && lang_1.isPresent(this._params)) {
      this._navigationHref = this._router.generate(this._route, this._params);
      this._visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
      this._renderer.setElementAttribute(this._elementRef, 'href', this._visibleHref);
    }
  };
  RouterLink = __decorate([decorators_1.Directive({
    selector: '[router-link]',
    properties: ['route: routerLink', 'params: routerParams'],
    lifecycle: [annotations_1.onAllChangesDone],
    host: {'(^click)': 'onClick()'}
  }), __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, location_1.Location, api_1.Renderer])], RouterLink);
  return RouterLink;
})();
exports.RouterLink = RouterLink;
exports.__esModule = true;
