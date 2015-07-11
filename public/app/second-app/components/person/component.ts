/// <reference path="../../../../../typings/angular2/angular2.d.ts"/>

import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import {Component, View} from 'angular2/angular2';

interface IPerson {
	name: string;
	lastName: string;
	age: number;
}

@Component({
	selector: 'person-item'
})
@View({
	templateUrl: 'app/second-app/components/person/template.html'
})
class Person implements IPerson {
	name;
	lastName;
	age;
}

export {Person};