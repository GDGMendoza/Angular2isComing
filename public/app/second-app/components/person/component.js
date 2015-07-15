import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import * as angular from 'angular2/angular2';

var Person = angular.Component({
	selector: 'person-item',
	properties: ['name', 'lastName', 'age']
})
.View({
	templateUrl: 'app/second-app/components/person/template.html'
})
.Class({
	constructor: [function(){
		
	}]
})

export {Person};