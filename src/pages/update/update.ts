import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  update_data: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, 
  	public restProvider: RestProvider, public loadingController: LoadingController) {
  	this.update_data = JSON.parse(this.navParams.get('update_data'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }

  doUpdate() {
  	let loading = this.loadingController.create({content : "Loading..."});
    loading.present();
  	var tmpUpdate = {
  	  "pid": this.update_data.id,
  	  "qty": this.update_data.quantity,
  	  "price": this.update_data.price,
  	}
	  this.restProvider.updateProduct(tmpUpdate).then(data => {
  	  if(data['error']) {
        loading.dismiss();
    	  this.toastMessage(data['message']);
  	  }
  	  else {
        loading.dismiss();
      	this.toastMessage("Update product successfully");
      	this.navCtrl.pop();
  	  }
	  });
  }

  toastMessage(data : string) {
    this.toast.create({
      message: data,
      duration: 3000
    }).present();
  }

}
