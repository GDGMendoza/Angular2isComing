/// <reference path="../../../typings/rx/rx.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>

// aunque rx es parte del core de angular, para poder acceder a la misma tengo que importarla
import * as Rx from 'rx/index';
import * as _ from 'lodash';

// extender prototipo de Array para realizar una función al momento del push que se encargue de avisar que hubieron cambios

var services = 0;

var personList = Array();

var arrayObserve = Rx.Observable.fromCallback(Array.observe);

/*var source = Array.observe(personList, function(){
	console.log('el gran callback');
});*/

var createSubscription = function(list, onNext){

	var source = arrayObserve(list); 
	
	return source.subscribe(
		function (x) {
			console.log('next: ', x);
			
			onNext();
			
		},
		function (err) {
			console.error('error', err);
		},
		function () {
			console.log('completed');
		}
	)
	
};

class PeopleService {
	personList = personList;
	addPerson = function (person) {
		personList.push(person);
	};
	subscription;
	
	apply = function(){
		this.subscription = createSubscription(personList, this.apply); 
	};
	
	createExternalSubscription = function(callback){
		return createSubscription(personList, callback);
	};
	
	constructor(){
		console.log('People Service Iniciado');
		
		var self = this;
		
		this.subscription = createSubscription(personList, this.apply);	
		
		setInterval(function(){
			
		}, 20);	
	}
}

export {PeopleService};