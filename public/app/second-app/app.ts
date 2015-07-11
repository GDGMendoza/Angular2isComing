/// <reference path="../../../typings/angular2/angular2.d.ts"/>

import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import {bootstrap, Component, View, NgFor} from 'angular2/angular2';

// dado que la extensión por defecto es .js, la rompo con el signo ?
import {ThirdApp} from 'app/third-app/app.ts?';
import {Person} from 'app/second-app/components/person/components.ts?';
import {PeopleService} from 'app/second-app/services.ts?';

@Component({
	selector: 'second-app'
})
@View({
	directives: [NgFor],
	templateUrl: 'app/second-app/template.html'
})
class secondApp {
	messageList = [
		{
			message: 'Mensajeeeeee'
		},
		{
			message: 'Nada serio'
		},
		{
			message: 'Lo que sea'
		}
	];
	
	bootstrapThirdApp = function(){
		bootstrap(ThirdApp, [
			PeopleService
		])
		.then(
			message => console.log('third app success', message),
			message => console.log('third app error', message)
		);
	}
	
	peopleService;
	
	constructor(peopleService: PeopleService){
		this.peopleService = peopleService;
	}
}

bootstrap(secondApp, [
	// injectamos el servicio en la segunda aplicación
	PeopleService
])
.then(
	message => console.log('second app success', message),
	message => console.log('second app error', message)
)