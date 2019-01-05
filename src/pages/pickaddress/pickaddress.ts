import { CartService } from './../../service/domain/cart.service';
import { PedidoDTO } from './../../model/pedido.dto';
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
              public clienteService: ClienteService,
              public cartService: CartService
              ) {
  }

  items: Array<EnderecoDTO> = [];
  pedido : PedidoDTO;

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response["enderecos"];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente : {id: response["id"]},
            enderecoDeEntrega : null,
            pagamneto : null,
            itens: cart.itens.map(x => {
              return {
                quantidade: x.quantidade,
                produto: {id: x.produto.id} 
              }
            })
          };
        }, error => {
          if(error.status == 403){
            this.navCtrl.setRoot("HomePage");
          }
         });
    }else{
      this.navCtrl.setRoot("HomePage");
    }
  
  }

  nextPage(item : EnderecoDTO){
    let pedido = this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push("PaymentPage", {pedido: pedido});
  }

}
