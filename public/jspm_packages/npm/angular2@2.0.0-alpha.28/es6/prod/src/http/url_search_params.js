/* */ 
"format cjs";
import { StringWrapper } from 'angular2/src/facade/lang';
import { Map, MapWrapper, ListWrapper } from 'angular2/src/facade/collection';
function paramParser(rawParams) {
    var map = new Map();
    var params = StringWrapper.split(rawParams, '&');
    ListWrapper.forEach(params, (param) => {
        var split = StringWrapper.split(param, '=');
        var key = ListWrapper.get(split, 0);
        var val = ListWrapper.get(split, 1);
        var list = map.get(key) || [];
        list.push(val);
        map.set(key, list);
    });
    return map;
}
export class URLSearchParams {
    constructor(rawParams) {
        this.rawParams = rawParams;
        this.paramsMap = paramParser(rawParams);
    }
    has(param) { return this.paramsMap.has(param); }
    get(param) { return ListWrapper.first(this.paramsMap.get(param)); }
    getAll(param) { return this.paramsMap.get(param) || []; }
    append(param, val) {
        var list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    }
    toString() {
        var paramsList = [];
        MapWrapper.forEach(this.paramsMap, (values, k) => {
            ListWrapper.forEach(values, v => { paramsList.push(k + '=' + v); });
        });
        return ListWrapper.join(paramsList, '&');
    }
    delete(param) { MapWrapper.delete(this.paramsMap, param); }
}
//# sourceMappingURL=url_search_params.js.map