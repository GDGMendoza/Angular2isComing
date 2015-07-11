/* */ 
"format cjs";
import { isPresent, isBlank, isJsObject, BaseException } from 'angular2/src/facade/lang';
import { isListLikeIterable, Map, MapWrapper, ListWrapper } from 'angular2/src/facade/collection';
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class). The only known
 * difference from the spec is the lack of an `entries` method.
 */
export class Headers {
    constructor(headers) {
        if (isBlank(headers)) {
            this._headersMap = new Map();
            return;
        }
        if (isPresent(headers._headersMap)) {
            this._headersMap = headers._headersMap;
        }
        else if (isJsObject(headers)) {
            this._headersMap = MapWrapper.createFromStringMap(headers);
            MapWrapper.forEach(this._headersMap, (v, k) => {
                if (!isListLikeIterable(v)) {
                    var list = [];
                    list.push(v);
                    this._headersMap.set(k, list);
                }
            });
        }
    }
    append(name, value) {
        var list = this._headersMap.get(name) || [];
        list.push(value);
        this._headersMap.set(name, list);
    }
    delete(name) { MapWrapper.delete(this._headersMap, name); }
    forEach(fn) { return MapWrapper.forEach(this._headersMap, fn); }
    get(header) { return ListWrapper.first(this._headersMap.get(header)); }
    has(header) { return this._headersMap.has(header); }
    keys() { return MapWrapper.keys(this._headersMap); }
    // TODO: this implementation seems wrong. create list then check if it's iterable?
    set(header, value) {
        var list = [];
        if (!isListLikeIterable(value)) {
            list.push(value);
        }
        else {
            list.push(ListWrapper.toString(value));
        }
        this._headersMap.set(header, list);
    }
    values() { return MapWrapper.values(this._headersMap); }
    getAll(header) { return this._headersMap.get(header) || []; }
    entries() { throw new BaseException('"entries" method is not implemented on Headers class'); }
}
//# sourceMappingURL=headers.js.map