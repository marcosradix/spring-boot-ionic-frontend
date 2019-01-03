
import { ProdutoDTO } from './../../model/produto.dto';
import { CartService } from './../../service/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../model/cart-item';
import { ProdutoService } from '../../service/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  items: Array<CartItem> = [];

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (let index = 0; index < this.items.length; index++) {
      let item = this.items[index];
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.baseUrlBucket}/prod${item.produto.id}-small.jpg`;
      },
        error => { });
    }

  }

  showItemDetale(item: any) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: item.produto.id });
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProdutoCart(produto).itens; 
  }
  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseProdutoCartQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseProdutoCartQuantity(produto).itens;
  }

  total(): number{
    return this.cartService.totalCarrinho();
  }

  continuarComprando(){
    this.navCtrl.setRoot("CategoriasPage");
  }

}
