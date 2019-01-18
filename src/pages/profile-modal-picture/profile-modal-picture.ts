import { ClienteService } from './../../service/domain/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile-modal-picture',
  templateUrl: 'profile-modal-picture.html',
})
export class ProfileModalPicturePage {

  picture: string;
  cameraOn: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public clienteService: ClienteService,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPicturePage');
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,

    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.picture = base64Image;
      this.cameraOn = false;
    }, err => {
      console.log(err)
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(() => {
        this.picture = null;
      }, error => {
        console.log( JSON.stringify(error) );
      });
  }

  cancel(){
    this.picture = null;
  }

  closeModal() {
    console.log("fechando modal")
    this.viewCtrl.dismiss();
  }

}
