import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

	create_data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
    private toast: ToastController, public loadingController: LoadingController) {
  	this.create_data = {
  	  brand: "",
      type: "",
      quantity: "",
      price: ""
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  doCreate() {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();
  	this.restProvider.createProduct(this.create_data).then(data => {
      if(data['error']) {
        this.toastMessage(data['message']);
        loading.dismiss();
      }
      else {
        loading.dismiss();
        this.toastMessage("Create new product successfully");
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
