import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestProvider {

	apiUrl = 'https://us-central1-fir-advance-bf42b.cloudfunctions.net/webApi';
	
	constructor(public http: HttpClient) {
		console.log('Hello RestProvider Provider');
	}

	getProducts() {
	  return new Promise(resolve => {
	    this.http.get(this.apiUrl+'/api/v1/products/all').subscribe(data => {
	      resolve(data);
	    }, err => {
	      console.log(err);
	    });
	  });
	}
}
