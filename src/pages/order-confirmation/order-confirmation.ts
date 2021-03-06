import { PedidoService } from './../../service/domain/pedido.service';
import { ClienteService } from './../../service/domain/cliente.service';
import { ClienteDTO } from './../../model/cliente.dto';
import { CartService } from './../../service/domain/cart.service';
import { CartItem } from './../../model/cart-item';
import { PedidoDTO } from './../../model/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../model/endereco.dto';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: Array<CartItem> = [];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {
    this.pedido = navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().itens;
    let clienteId = this.pedido.cliente.id;

    this.clienteService.findById(clienteId).subscribe(cli => {
      this.cliente = cli as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, cli["enderecos"]);
    }, error => {
      this.navCtrl.setRoot("HomePage");
    });
  }
  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    //retorna o index da lista onde obedecer a lambda
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.totalCarrinho();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(resp => {
        this.cartService.createOrCleanCart();
        this.codPedido = this.extractIdLocation(resp.headers.get("location"));
        console.log("response", resp.headers.get("location"));
      }, error => {
        if (error.status == 403) {
          this.navCtrl.setRoot("HomePage");
        }
      });
  }

  back() {
    this.navCtrl.setRoot("CartPage");
  }

  home(){
    this.navCtrl.setRoot("CategoriasPage");
  }

  private extractIdLocation(location: string): string {
    let position = location.lastIndexOf("/");
    return location.substring(position + 1, location.length);
  }
}
