import { ClienteDTO } from './../../model/cliente.dto';
import { ClienteService } from './../../service/domain/cliente.service';
import { StorageService } from './../../service/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../model/endereco.dto';


@IonicPage()
@Component({
  selector: 'page-pickaddress',
  templateUrl: 'pickaddress.html',
})
export class PickaddressPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService
              ) {
  }

  items: Array<EnderecoDTO> = [];

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response["enderecos"]
        }, error => {
          if(error.status == 403){
            this.navCtrl.setRoot("HomePage");
          }
         });
    }else{
      this.navCtrl.setRoot("HomePage");
    }


    this.items = [
      {
        id: "1",
        logradouro: "Rua quinze de novenbro",
        numero: "300",
        complemento: "Apto B",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade : {
          id: "1",
          nome: "Uberlandia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua dos Coelhos",
        numero: "115",
        complemento: "B",
        bairro: "Maraponga",
        cep: "60710705",
        cidade : {
          id: "2",
          nome: "Fortaleza",
          estado: {
            id: "2",
            nome: "Ceará"
          }
        }
      }
    ]
  }

}
