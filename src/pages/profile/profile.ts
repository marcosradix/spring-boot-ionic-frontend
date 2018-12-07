import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../service/domain/cliente.service';
import { ClienteDTO } from './../../model/cliente.dto';
import { StorageService } from './../../service/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();
        }, error => { });
    }
  }


  getImageIfExists() {
  //  this.cliente.imageUrl = `${API_CONFIG.baseUrlBucket}/cp${this.cliente.id}.jpg`;
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.baseUrlBucket}/cp${this.cliente.id}.jpg`;
      }, error => { });
  }

}
