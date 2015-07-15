import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import * as angular from 'angular2/angular2';
import {PeopleService} from 'app/second-app/services.js';


var ThirdApp = angular.Component({
	selector: 'third-app',
	appInjector: [PeopleService]
})
.View({
	templateUrl: 'app/third-app/template.html'
})
.Class({
	constructor: [PeopleService, function(peopleService){
		
		this.peopleService = peopleService;
		
		this.peopleService.createExternalSubscription(function(){
			
		});
		
		console.log('third-app', this);
		
	}]
});

export {ThirdApp};