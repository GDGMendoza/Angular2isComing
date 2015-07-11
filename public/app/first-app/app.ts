/// <reference path="../../../typings/angular2/angular2.d.ts"/>

// IMPORTANTE en vez de instalar jspm, instalar jspm@beta o tira un error en el forEach :/

//https://github.com/jspm/registry/issues/432
import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import {bootstrap, Component, View} from 'angular2/angular2';

@Component({
	selector: 'first-app'
})
@View({
	templateUrl: 'app/first-app/template.html'
})
class firstApp {
	
}

bootstrap(firstApp, [
	
])
.then(
	function(message){
		console.log('first app success', message);
	}
)
.catch(function(message){
	console.log('first app error', message);
});