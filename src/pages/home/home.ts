import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	products: any;

	constructor(public navCtrl: NavController, public restProvider: RestProvider) {
	}

	ionViewDidLoad(){
		this.getProductsAll();
	}

	getProductsAll() {
		this.restProvider.getProducts().then(data => {
			this.products = data['data'];
		});
	}
}
