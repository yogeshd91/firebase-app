import { HttpClient, HttpHeaders} from '@angular/common/http';
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

	createProduct(data) {
	  return new Promise((resolve, reject) => {

	    this.http.post(this.apiUrl+'/api/v1/products/create', data)
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });		
	}

	deleteProduct(data) {
	  return new Promise((resolve, reject) => {

	    this.http.post(this.apiUrl+'/api/v1/products/delete', data)
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	updateProduct(data) {
	  return new Promise((resolve, reject) => {

	    this.http.post(this.apiUrl+'/api/v1/products/update', data)
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}
}
