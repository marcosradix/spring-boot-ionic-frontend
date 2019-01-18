import { ProdutoService } from './../../service/domain/produto.service';
import { ProdutoDTO } from './../../model/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../service/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService: ProdutoService,
              public cartService: CartService,
              public loadingCtrl: LoadingController) {
  }

  getImageIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
    .subscribe(response =>{
     return  this.item.imageUrl = `${API_CONFIG.baseUrlBucket}/prod${this.item.id}.jpg`;
    }, error => {});
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get("produto_id");
    let loader = this.presentLoading();
    this.produtoService.findById(produtoId)
    .subscribe(response =>{
      this.item = response;
      this.getImageIfExists();
      loader.dismiss();
    }, error =>{loader.dismiss()});
    
  }
  
  addToCart(produto: ProdutoDTO){
        this.cartService.addProdutoCart(produto);
        this.navCtrl.setRoot("CartPage");
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    loading.present();
    return loading;
  }
}
