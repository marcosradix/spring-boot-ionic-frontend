import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../model/endereco.dto';


@IonicPage()
@Component({
  selector: 'page-pickaddress',
  templateUrl: 'pickaddress.html',
})
export class PickaddressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  items: Array<EnderecoDTO> = [];

  ionViewDidLoad() {
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
