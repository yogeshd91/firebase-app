import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

import { CreatePage } from '../create/create'
import { UpdatePage } from '../update/update'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	products: any;

	constructor(public navCtrl: NavController, public restProvider: RestProvider, private toast: ToastController, 
		public loadingController: LoadingController) {
	}

	ionViewDidEnter() {
		this.getProductsAll();
	}

	getProductsAll() {
		let loading = this.loadingController.create({content : "Loading..."});
    	loading.present();
		this.restProvider.getProducts().then(data => {
			this.products = data['data'];
			loading.dismiss();
		});
	}

	doCreate() {
		this.navCtrl.push(CreatePage);
	}

	doDelete(data) {
		let loading = this.loadingController.create({content : "Loading..."});
    	loading.present();
		var tmpDelete = {
			"pid": data.id
		}
		this.restProvider.deleteProduct(tmpDelete).then(data => {
		  	if(data['error']) {
	        	this.toastMessage(data['message']);
	        	loading.dismiss();
	      	}
	      	else {
	        	this.toastMessage("Delete product successfully");
	        	this.getProductsAll();
	        	loading.dismiss();
			}
		});
	}

	doUpdate(data) {
    	this.navCtrl.push(UpdatePage, {update_data: JSON.stringify(data)});
	}

	toastMessage(data : string) {
    	this.toast.create({
      		message: data,
      		duration: 3000
    	}).present();
  	}
}
