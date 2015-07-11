import { ElementRef } from 'angular2/core';
import { Router } from './router';
import { Location } from './location';
import { Renderer } from 'angular2/src/render/api';
/**
 * The RouterLink directive lets you link to specific parts of your app.
 *
 *
 * Consider the following route configuration:

 * ```
 * @RouteConfig({
 *   path: '/user', component: UserCmp, as: 'user'
 * });
 * class MyComp {}
 * ```
 *
 * When linking to a route, you can write:
 *
 * ```
 * <a router-link="user">link to user component</a>
 * ```
 *
 * @exportedAs angular2/router
 */
export declare class RouterLink {
    private _elementRef;
    private _router;
    private _location;
    private _renderer;
    private _route;
    private _params;
    _visibleHref: string;
    _navigationHref: string;
    constructor(_elementRef: ElementRef, _router: Router, _location: Location, _renderer: Renderer);
    route: string;
    params: StringMap<string, string>;
    onClick(): boolean;
    onAllChangesDone(): void;
}
export declare var __esModule: boolean;
