/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../second-app/app.ts"/>

import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import {bootstrap, Component, View} from 'angular2/angular2';
import {PeopleService} from 'app/second-app/services.ts?';


@Component({
	selector: 'third-app'
})
@View({
	templateUrl: 'app/third-app/template.html'
})
class ThirdApp {
	peopleService: PeopleService;
	constructor(peopleService: PeopleService){
		this.peopleService = peopleService;
		
		this.peopleService.createExternalSubscription(function(){
			
		})
		
		console.log('third-app    ', this);
	}
}

export {ThirdApp};