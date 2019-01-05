import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../service/domain/cliente.service';
import { ClienteDTO } from './../../model/cliente.dto';
import { StorageService } from './../../service/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../service/auth.service';

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
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public authService: AuthService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        }, error => {
          if(error.status == 403){
            this.navCtrl.setRoot("HomePage");
          }
         });
    }else{
      this.navCtrl.setRoot("HomePage");
    }

  }


  getImageIfExists() {
   this.cliente.imageUrl = `${API_CONFIG.baseUrlBucket}/cp${this.cliente.id}.jpg`;
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.baseUrlBucket}/cp${this.cliente.id}.jpg`;
      }, error => { 
        console.log("Não existe imagem cadastrada" ,JSON.stringify(error));
        this.cliente.imageUrl = '/assets/imgs/avatar-blank.png';
      });
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar saída',
      message: 'Você sairá do sistema comessa ação!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('não sair');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Saindo.....');
            this.authService.logout();
            this.navCtrl.setRoot("HomePage");
          }
        }
      ]
    });
    alert.present();
  }

}
